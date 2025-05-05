import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Handler principal da API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apenas permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const { db, collection, document } = req.body;

    // Verificar se todos os campos necessários estão presentes
    if (!db || !collection || !document) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Verifique os campos obrigatórios.',
      });
    }

    // Conectar ao MongoDB
    const client = await connectToDatabase();

    // Selecionar o banco de dados e a coleção
    const database = client.db(db);
    const collectionRef = database.collection(collection);

    // Verificar se já existe um usuário com o mesmo email ou CPF/CNPJ
    const existingUser = await collectionRef.findOne({
      $or: [{ email: document.email }, { cpfcnpj: document.cpfcnpj }],
    });

    if (existingUser) {
      await client.close();
      return res.status(409).json({
        success: false,
        message: 'Já existe um usuário com este email ou CPF/CNPJ.',
      });
    }

    // Inserir o documento
    const result = await collectionRef.insertOne(document);

    // Fechar a conexão
    await client.close();

    // Retornar resposta de sucesso
    return res.status(201).json({
      success: true,
      message: 'Documento criado com sucesso',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar a solicitação',
      error: (error as Error).message,
    });
  }
}

// Função para conectar ao MongoDB
async function connectToDatabase() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI não definido nas variáveis de ambiente');
  }

  const client = new MongoClient(mongoURI);
  await client.connect();
  return client;
}
