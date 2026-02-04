export function gerarCodigoPedido() {
    const prefixo = 'VLO-';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
  
    for (let i = 0; i < 6; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
  
    return prefixo + codigo;
  }