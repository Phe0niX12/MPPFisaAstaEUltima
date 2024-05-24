import request from 'supertest';
import app from '../../app';
import Cow from '../../model/cows';

describe('Cows Controller', () => {
    beforeEach(async () => {
        Cow.deleteMany();
    });
    

    describe('GET /api/cow', () => {
        it('should return all cows', async () => {
            const cow1 =  Cow.create({
                "name": "Joiana",
                "type": 1,
                "color": "brown",
                "weight": 200
            });
            const cow2 = Cow.create({
                "name": "JoianaNANA",
                "type": 2,
                "color": "brown-ish",
                "weight": 2000
            });

            const response = await request(app).get('/api/cow');

            expect(response.status).toBe(200);

            expect(response.body).toEqual([cow1, cow2]);
        });
    });

    describe('GET /api/cow/:id', () => {
        it('should return a cows by id', async () => {
            const cow = Cow.create({
                "name": "JoianaNANA",
                "type": 2,
                "color": "brown-ish",
                "weight": 2000
            });

            const response = await request(app).get(`/api/cow/${cow.id}`);
            expect(response.status).toBe(200);

            expect(response.body).toEqual(cow);
        });
    });

    describe('POST /api/cow/', () => {
        it('should create a new cow', async () => {
            const cowData = Cow.create({
                "name": "JoianaNANA",
                "type": 2,
                "color": "brown-ish",
                "weight": 2000
            });

            const response = await request(app).post('/api/cow/').send(cowData);

            expect(response.status).toBe(200);

            expect(response.body.mill.name).toBe(cowData.name);

        });
    });

    describe('PUT /api/cow/:id', () => {
        it('should update a cow by id', async () => {
            const cow = Cow.create({
                "name": "JoianaNANA",
                "type": 2,
                "color": "brown-ish",
                "weight": 2000
            });
            
            const updatedCowData = Cow.create({
                "name": "JoianaNANA21",
                "type": 2,
                "color": "brown-ish",
                "weight": 2000
            });

            const response = await request(app)
                .put(`/api/cow/${cow.id}`)
                .send(updatedCowData);

            expect(response.status).toBe(200);

            expect(response.body.mill.name).toBe(updatedCowData.name);

            const updatedCow = Cow.get(cow.id);
            expect(updatedCow.name).toBe(updatedCowData.name);
        });
    });
    describe('DELETE /api/cow/:id', () => {
        it('should delete a cow by id', async () => {
            const cow = Cow.create({
                "name": "JoianaNANA",
                "type": 2,
                "color": "brown-ish",
                "weight": 2000
            });
            const response = await request(app).delete(`/api/cow/${cow.id}`);

            expect(response.status).toBe(200);

            expect(response.body.message).toBe('Cow deleted successfully');


            const deletedMill = Cow.get(cow.id);
            expect(deletedMill).toBeFalsy();
        });
    });

    
});
