export const errors: { [id: string]: {title: string, message: string} } = {
  invalid_credentials: { title: 'Erro de autenticação', message: 'Credenciais inválidas' },
  next_client_does_not_exist: {
    title: 'Erro',
    message: 'Não é possível chamar o próximo cliente.',
  },
  database_error: {
    title: 'Erro do servidor',
    message: 'Erro interno no banco de dados.',
  },
  token_not_found: {
    title: 'Usuário não autenticado',
    message: 'O token não foi encontrado.',
  },
  invalid_token: {
    title: 'Token inválido',
    message: 'Seu token expirou.',
  },
  invalid_resource: {
    title: 'Error',
    message: 'Recurso inválido.',
  },
  invalid_user_type: {
    title: 'Erro',
    message: 'Não há usuários do tipo informado.',
  },
  invalid_user: {
    title: 'Erro',
    message: 'Esse usuário é inválido, verifique as informações.',
  },
  user_not_found: {
    title: 'Usuário não encontrado',
    message: 'O usuário não foi encontrado.',
  },
  user_already_joined_in_queue: {
    title: 'Erro ao entrar em fila',
    message: 'Você já está em uma fila, saia da fila atual para entrar em outra.',
  },
  user_already_exited_or_attended: {
    title: 'Ação indisponível',
    message: 'O usuário já deixou a fila ou já foi atendido.',
  },
  user_already_exists: {
    title: 'Erro ao cadastrar',
    message: 'O email já está sendo utilizado.',
  },
  user_does_not_have_current_queue: {
    title: 'Fila',
    message: 'Você não está em nenhuma fila atualmente.',
  },
  user_does_not_have_permission: {
    title: 'Sem permissão',
    message: 'Você não tem permissão.',
  },
  unknown_error: { title: 'Erro', message: 'Erro desconhecido' },
};
