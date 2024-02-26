import jsonFiles from './csvjson.json' assert { type: 'json' } 

jsonFiles.map((item) => console.log(item.produto.descricao));