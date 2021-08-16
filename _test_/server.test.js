'use strict';
const server=require('../server');
const supertest=require('supertest');
const request=supertest(server.app);

describe('TEST FUCKEN SERVER ' ,()=>{
    it('200 STATUS sigin up',async()=>{
      const data=await request.post('/signup').send({
        username:'hasan@00100',
        password:'1122'
      });
      expect(data.status).toEqual(200);
    });

    it('200 STATUS sigin in' , async()=>{
        const data=await request.post('/signin').auth('hasan@001000' , 'fuck you');
        expect(data.status).toEqual(200);
    })

    it('403 STATUS sign in not sigining in', async()=>{
       
        const data=await request.post('/signin').auth('hasan@001000' , '0');
        expect(data.status).toEqual(403);
    })
} )