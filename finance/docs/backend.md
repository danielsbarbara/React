# FINANCE APP

## API'S

### ENDPOINT LOG IN
api/v1/login:
Login do usuário, deve verificar se o email existe e se a password é a correta, se sim retorna tudo ok, se não retorna "email não existente" ou "password errada caso seja password"

### ENDPOINT SIGN IN
api/v1/signin
O usuário deverá conseguir registar-se, este endpoint deve verificar se o email já existe, do front end recebe o nome do usuário, o email, a password.

### ENDPOINT INCOMES AND OUTCOMES
api/user/account/incomeOutcome
Api que recebe os dados do front end como o token de sessão, a descrição do in ou outcome, o valor do amount e a data. Este endpoint guarda todos estes valores na coleção "Accounts" referente ao usuário.