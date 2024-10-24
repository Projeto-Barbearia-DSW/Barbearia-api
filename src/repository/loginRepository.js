import con from "./connection.js"


export async function login(credenciais) {
    const comando = `
        select id_adm    as id,
               email_adm     as email
        from admin
        where email_adm = ? 
          and senha_adm = ?
    `

    const [registros] = await con.query(comando, [credenciais.email, credenciais.senha])
    return registros[0];
}