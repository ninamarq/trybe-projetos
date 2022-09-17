db.produtos.find({
  $and: [
        { nome: { $not: /Big Mac/ } },
        { nome: { $not: /McChicken/ } },
    ],
  }, { _id: 0, nome: 1, curtidas: 1, vendidos: 1 });
