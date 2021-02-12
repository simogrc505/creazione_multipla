const Book = require('../../../src/models/book')
// const moment = require('moment')
exports.seed = function () {
  // Deletes ALL existing entries
  return Book.deleteMany()
    .then(() => {
      // Inserts seed entries
      return Book.create([
        {
          id: "0b3f8a0a-c288-455b-8f9b-acc720e23805",
          title: 'Lo spettatore musicale',
          author: 'Piero Violante',
          genre: 'Arti e spettacolo',
          isbn: '9788838940309',
          published: '2021-02-11',
          created_at: new Date(),
          edited_at: null
        },
        {
          id: "f6571c48-fd0f-44f5-a4f4-c3f2a2d0d2cc",
          title: 'E allora le foibe?',
          author: 'Eric Gobetti',
          genre: 'Società, politica e comunicazione',
          isbn: '9788858141120',
          published: '2021-01-14',
          created_at: new Date(),
          edited_at: null
        },
        {
          id: "0b3f8a0a-c288-455b-8f9b-acc720e23804",
          title: 'Una rabbia semplice',
          author: 'Davide Longo',
          genre: 'Giallo',
          isbn: '9788806248147',
          published: '2021-01-26',
          created_at: new Date(),
          edited_at: null
        },
        {
          id: "ad2fdead-e8ed-4ca2-8173-e119bca47e8c",
          title: 'Contratto esempio',
          author: "L'appello",
          genre: 'Narrativa',
          isbn: '9788804734246',
          published: '2020-11-03',
          created_at: new Date(),
          edited_at: null
        },
      ])
    })
}
