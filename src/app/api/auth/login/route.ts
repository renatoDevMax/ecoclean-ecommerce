import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ClienteMatriz from '@/models/ClienteMatriz';
import ClienteFiliado from '@/models/ClienteFiliado';
import { Document } from 'mongoose';

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();
    console.log('Tentativa de login com identificador:', identifier);

    if (!identifier || !password) {
      console.log('Erro: Email/nome e senha são obrigatórios');
      return NextResponse.json(
        { success: false, message: 'Email/nome e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Conectar ao banco de dados
    console.log('Conectando ao banco de dados...');
    await connectToDatabase();
    console.log('Conexão bem-sucedida');

    // Procurar usuário por email ou nome na coleção clienteMatriz
    console.log('Procurando usuário na coleção clienteMatriz...');
    // Usando as assinaturas de tipo mais genéricas para evitar erros de tipagem
    let user: any = await (ClienteMatriz as any).findOne({
      $or: [{ email: identifier }, { nome: identifier }],
    });

    if (user) {
      // Converter para objeto JavaScript simples
      user = user.toObject ? user.toObject() : user;
      console.log('Usuário encontrado na coleção clienteMatriz');
    } else {
      // Se não encontrou, procurar na coleção clienteFiliado
      console.log('Usuário não encontrado na clienteMatriz, procurando na clienteFiliado...');
      user = await (ClienteFiliado as any).findOne({
        $or: [{ email: identifier }, { nome: identifier }],
      });

      if (user) {
        // Converter para objeto JavaScript simples
        user = user.toObject ? user.toObject() : user;
        console.log('Usuário encontrado na coleção clienteFiliado');
      }
    }

    if (!user) {
      console.log('Erro: Usuário não encontrado em nenhuma coleção');
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar a senha
    console.log('Verificando senha...');
    if (user.senha !== password) {
      console.log('Erro: Senha incorreta');
      return NextResponse.json({ success: false, message: 'Senha incorreta' }, { status: 401 });
    }

    console.log('Login bem-sucedido para:', user.nome);
    // Autenticação bem-sucedida
    return NextResponse.json(
      {
        success: true,
        message: 'Login bem-sucedido',
        user: {
          ...user,
          // Converter o _id para string para ser armazenado no localStorage
          _id: user._id ? user._id.toString() : undefined,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
