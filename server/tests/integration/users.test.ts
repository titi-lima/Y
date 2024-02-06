import request from 'supertest';

import app from '../../src/app';
import { connection } from '../Helper/database.config';

describe('User Test', () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterEach(async () => {
        await connection.clear();
    });

    afterAll(async () => {
        await connection.close();
    });

    it('Should be able to follow a user', async () => {
        console.log("Teste 1")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        const user2 = {
            nickName: 'jane_smith',
            name: 'Jane Smith',
            password: 'password123',
            description: 'Tech enthusiast',
            dateBirth: new Date('1990-05-15'),
        };

        await request(app).post('/users').send(user1);
        await request(app).post('/users').send(user2);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const dataId2 = await request(app).get('/users/jane_smith/getIdByNickName')
        const id2 = {
            followsId: dataId2.body.data
        }

        const rota = '/users/' + id1.followsId + '/insertFollows'
        const response = await request(app).post(rota).send(id2);

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User insert follows')
    });

    it('It shouldnt be possible to follow a person with an incorrect ID, case 1', async () => {
        console.log("Teste 2")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        await request(app).post('/users').send(user1);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const id2 = {
            followsId: "idIncorreto"
        }

        const rota = '/users/' + id1.followsId + '/insertFollows'
        const response1 = await request(app).post(rota).send(id2);

        expect(response1.status).toBe(400)
        expect(response1.body.message).toBe('This newFollowsId is not registred')
    });

    it('It shouldnt be possible to follow a person with an incorrect ID, case 2', async () => {
        console.log("Teste 2, caso 2")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        await request(app).post('/users').send(user1);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const id2 = {
            followsId: "idIncorreto"
        }

        const rota = '/users/' + id2.followsId + '/insertFollows'
        const response1 = await request(app).post(rota).send(id1);

        expect(response1.status).toBe(400)
        expect(response1.body.message).toBe('This userId is not registred')
    });

    it('It shouldnt be possible to follow the same person twice', async () => {
        console.log("Teste 3")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        const user2 = {
            nickName: 'jane_smith',
            name: 'Jane Smith',
            password: 'password123',
            description: 'Tech enthusiast',
            dateBirth: new Date('1990-05-15'),
        };

        await request(app).post('/users').send(user1);
        await request(app).post('/users').send(user2);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const dataId2 = await request(app).get('/users/jane_smith/getIdByNickName')
        const id2 = {
            followsId: dataId2.body.data
        }

        const rota = '/users/' + id1.followsId + '/insertFollows'
        const response1 = await request(app).post(rota).send(id2);
        const response2 = await request(app).post(rota).send(id2);

        expect(response1.status).toBe(200)
        expect(response2.status).toBe(400)
        expect(response2.body.message).toBe('This newFollowsId is already registred in userId follows')
    });

    it('It shouldnt be possible for the person to follow themselves', async () => {
        console.log("Teste 4")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        await request(app).post('/users').send(user1);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const rota = '/users/' + id1.followsId + '/insertFollows'
        const response1 = await request(app).post(rota).send(id1);

        expect(response1.status).toBe(400)
        expect(response1.body.message).toBe('This userId is the same as followsId')
    }); 

    it('It should be able to list follows', async () => {
        console.log("Teste 5")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        const user2 = {
            nickName: 'jane_smith',
            name: 'Jane Smith',
            password: 'password123',
            description: 'Tech enthusiast',
            dateBirth: new Date('1990-05-15'),
          };
          
        const user3 = {
            nickName: 'mike_j',
            name: 'Mike Johnson',
            password: 'qwerty',
            description: 'Adventure seeker',
            dateBirth: new Date('1985-08-20'),
        };
        
        const user4 = {
            nickName: 'em_davis',
            name: 'Emily Davis',
            password: 'p@ssw0rd',
            description: 'Book lover',
            dateBirth: new Date('1992-02-10'),
        };

        await request(app).post('/users').send(user1);
        await request(app).post('/users').send(user2);
        await request(app).post('/users').send(user3);
        await request(app).post('/users').send(user4);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const dataId2 = await request(app).get('/users/jane_smith/getIdByNickName')
        const id2 = {
            followsId: dataId2.body.data
        }

        const dataId3 = await request(app).get('/users/mike_j/getIdByNickName')
        const id3 = {
            followsId: dataId3.body.data
        }

        const dataId4 = await request(app).get('/users/em_davis/getIdByNickName')
        const id4 = {
            followsId: dataId4.body.data
        }

        const rota1 = '/users/' + id1.followsId + '/insertFollows'
        await request(app).post(rota1).send(id2);
        await request(app).post(rota1).send(id3);
        await request(app).post(rota1).send(id4);

        const rota2 = '/users/' + id1.followsId + '/follows'
        const response = await request(app).get(rota2)

        const expectData = [
            {
                "id": id2.followsId,
                "nickName": "jane_smith",
                "name": "Jane Smith"
            },
            {
                "id": id3.followsId,
                "nickName": "mike_j",
                "name": "Mike Johnson"
            },
            {
                "id": id4.followsId,
                "nickName": "em_davis",
                "name": "Emily Davis"
            }
        ]
        JSON.stringify(response.body.data)
        expect(response.status).toBe(200)
        expect(JSON.stringify(response.body.data)).toBe(JSON.stringify(expectData))
    });

    it('It shouldnt be able to list follows with an incorrect ID', async () => {
        console.log("Teste 6")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        const user2 = {
            nickName: 'jane_smith',
            name: 'Jane Smith',
            password: 'password123',
            description: 'Tech enthusiast',
            dateBirth: new Date('1990-05-15'),
          };

        await request(app).post('/users').send(user1);
        await request(app).post('/users').send(user2);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const dataId2 = await request(app).get('/users/jane_smith/getIdByNickName')
        const id2 = {
            followsId: dataId2.body.data
        }

        const rota1 = '/users/' + id1.followsId + '/insertFollows'
        await request(app).post(rota1).send(id2);

        const rota2 = '/users/' + "IncorrectId" + '/follows'
        const response = await request(app).get(rota2)

        JSON.stringify(response.body.data)
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("This userId is not registred")
    });

    it('It should be able to list followers', async () => {
        console.log("Teste 7")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        const user2 = {
            nickName: 'jane_smith',
            name: 'Jane Smith',
            password: 'password123',
            description: 'Tech enthusiast',
            dateBirth: new Date('1990-05-15'),
          };
          
        const user3 = {
            nickName: 'mike_j',
            name: 'Mike Johnson',
            password: 'qwerty',
            description: 'Adventure seeker',
            dateBirth: new Date('1985-08-20'),
        };
        
        const user4 = {
            nickName: 'em_davis',
            name: 'Emily Davis',
            password: 'p@ssw0rd',
            description: 'Book lover',
            dateBirth: new Date('1992-02-10'),
        };

        await request(app).post('/users').send(user1);
        await request(app).post('/users').send(user2);
        await request(app).post('/users').send(user3);
        await request(app).post('/users').send(user4);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const dataId2 = await request(app).get('/users/jane_smith/getIdByNickName')
        const id2 = {
            followsId: dataId2.body.data
        }

        const dataId3 = await request(app).get('/users/mike_j/getIdByNickName')
        const id3 = {
            followsId: dataId3.body.data
        }

        const dataId4 = await request(app).get('/users/em_davis/getIdByNickName')
        const id4 = {
            followsId: dataId4.body.data
        }

        const rota1 = '/users/' + id2.followsId + '/insertFollows'
        await request(app).post(rota1).send(id1);

        const rota2 = '/users/' + id3.followsId + '/insertFollows'
        await request(app).post(rota2).send(id1);

        const rota3 = '/users/' + id4.followsId + '/insertFollows'
        await request(app).post(rota3).send(id1);

        const rota4 = '/users/' + id1.followsId + '/followers'
        const response = await request(app).get(rota4)

        const expectData = [
            {
                "id": id2.followsId,
                "nickName": "jane_smith",
                "name": "Jane Smith"
            },
            {
                "id": id3.followsId,
                "nickName": "mike_j",
                "name": "Mike Johnson"
            },
            {
                "id": id4.followsId,
                "nickName": "em_davis",
                "name": "Emily Davis"
            }
        ]
        JSON.stringify(response.body.data)
        expect(response.status).toBe(200)
        expect(JSON.stringify(response.body.data)).toBe(JSON.stringify(expectData))
    });
    
    it('It shouldnt be able to list followers with an incorrect ID', async () => {
        console.log("Teste 8")
        const user1 = {
            nickName: 'john_doe',
            name: 'John Doe',
            password: '123456',
            description: 'A cool guy',
            dateBirth: new Date(),
        };

        const user2 = {
            nickName: 'jane_smith',
            name: 'Jane Smith',
            password: 'password123',
            description: 'Tech enthusiast',
            dateBirth: new Date('1990-05-15'),
          };

        await request(app).post('/users').send(user1);
        await request(app).post('/users').send(user2);

        const dataId1 = await request(app).get('/users/john_doe/getIdByNickName')
        const id1 = {
            followsId: dataId1.body.data
        }

        const dataId2 = await request(app).get('/users/jane_smith/getIdByNickName')
        const id2 = {
            followsId: dataId2.body.data
        }

        const rota1 = '/users/' + id1.followsId + '/insertFollows'
        await request(app).post(rota1).send(id2);

        const rota2 = '/users/' + "IncorrectId" + '/followers'
        const response = await request(app).get(rota2)

        JSON.stringify(response.body.data)
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("This userId is not registred")
    });
});