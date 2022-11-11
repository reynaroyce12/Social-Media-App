const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://admin-royce:test123@cluster0.yikcd.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('test');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('postmessages');

    const mockUser = {_id: '7845125', title: 'testDoc', message: 'testMessage'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: '7845125'});
    expect(insertedUser).toEqual(mockUser);
    await users.deleteOne({_id: '7845125'})
  });
});