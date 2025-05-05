import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ClienteMatriz from '@/models/ClienteMatriz';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userData = data.document;

    console.log('Tentando salvar usuário:', userData);

    // Verificar campos obrigatórios
    if (!userData.nome || !userData.email || !userData.senha || !userData.cpfcnpj) {
      return NextResponse.json(
        { success: false, message: 'Campos obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    // Conectar ao banco de dados
    console.log('Conectando ao banco de dados...');
    await connectToDatabase();
    console.log('Conexão bem-sucedida');

    // Verificar se já existe um usuário com o mesmo email ou CPF/CNPJ
    const existingUser = await ClienteMatriz.findOne({
      $or: [{ email: userData.email }, { cpfcnpj: userData.cpfcnpj }],
    });

    if (existingUser) {
      console.log('Usuário já existe:', userData.email, userData.cpfcnpj);
      return NextResponse.json(
        { success: false, message: 'Já existe um usuário com este email ou CPF/CNPJ.' },
        { status: 409 }
      );
    }

    // Criar novo usuário
    const newUser = new ClienteMatriz(userData);
    await newUser.save();
    console.log('Usuário salvo com sucesso:', newUser._id);

    return NextResponse.json(
      {
        success: true,
        message: 'Usuário cadastrado com sucesso',
        id: newUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar a solicitação',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
