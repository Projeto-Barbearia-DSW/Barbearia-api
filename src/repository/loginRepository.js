import con from "./connection.js"


export async function login(credenciais) {
    const comando = `
        select id_admin    as id,
               email     as email
        from admin
        where email = ? 
          and senha = ?
    `

    const [registros] = await con.query(comando, [credenciais.email, credenciais.senha])
    return registros[0];
}