
//routes/index.js
module.exports = function(app,Board)
{

  //GET ALL BOARDER
  app.get('/api/boards', (request, response) => {
    Board.find((error, boards) => {
      if(error) {return response.status(500).send({error: 'database failure'});}
      response.json(boards);
    })
  });

  //GET SINGLE BOARDER
  app.get('/api/boards/:board_id', (request, response) => {
    Board.findOne({_id: request.params.board_id}, (error, board) => {
      if (error) {return response.status(500).json({error:err});}
      if (!board) {return response.status(404).json({error: 'board not found'});}
        response.json(board);
    })
  });

  //GET BOARD BY WRITER
  app.get('/api/boards/writer/:writer', (request, response) => {
    Board.find({writer: reqeust.params.writer}, {_id: 0, title: 1, contents:1}, (error, Boards) => {
      if(err) {return response.status(500).json({error: error});}
      if(boards.length === 0) {return response.status(404).json({error: 'book not found'});
      response.json(boards);}
    })
  })
// find()메서드에서 첫번째 인자에는 query를 두번째는 projection을 입력함

  //CREATE Board
  app.post('/api/boards', (request, response) => {

    let board = new Board();

    board.title = request.body.title;
    board.writer = request.body.writer;
    board.contents = request.body.contents;

    board.save((err) => {
      if (err) {
        console.error(err);
        response.json({result: 0});
        return;
      }
      response.json({result:1});
    });
  })

  //UPDATA THE BOOK
  app.put('/api/boards/:board_id', (request, response) => {
    Board.findById(request.params.board_id, (err,board) => {
      if(err) return response.status(500).json({ error: 'database failure'});
      if(!board) return response.status(404).json({ error: 'board not found'});

      if (request.body.title) board.title = request.body.title;
      if (request.body.writer) board.writer = request.body.writer;
      if (request.body.contents) board.contents = request.body.contents;

      board.save((err) => {
        if (err) response.status(500).json({error: 'failed to updata'});
        response.json({message: 'board updated'});
      })
    })
  })

  //GET ALL BOARDER
  app.delete('/api/boards/:board_id', (request, response) => {
    Board.remove({_id: request.params.board_id }, (error, output) => {
      if(error) {return response.status(500).json({error: "database failure"});}

/*
  if(!output.reuslt.n)
*/
      response.status(204).end();
    });
  });

}
