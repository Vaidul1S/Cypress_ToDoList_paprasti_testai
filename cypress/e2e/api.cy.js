/// <reference types="cypress" />

describe('API testing methods', () => {
    it('GET', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
            .its('status').should('eq', 200);

    });

    it('POST', () => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', { body: { title: 'test post', body: 'this is test post', user_id: 5 } })
            .its('status').should('eq', 201);

    });

    it('PUT', () => {
        const params = {
            body: {
                title: 'test put',
                body: 'this is test put',
                user_id: 1,
                id: 1
            }
        }

        cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/1', params)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.body.title).to.eq('test put')
                expect(response.body.body.body).to.eq('this is test put')
                expect(response.body.body.user_id).to.eq(1)
                expect(response.body.body.id).to.eq(1)
            });

    });

    it('DELETE', () => {
        cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => {
                expect(response.status).to.eq(200);
            })

    })

    it('POST via fixtures', () => {

        cy.fixture('test').then((manoData) => {
            const requestBody = manoData;
            cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', requestBody)
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.body.title).to.eq('test post fixtures')
                expect(response.body.body.body).to.eq('this is test post fixtures')
                expect(response.body.body.user_id).to.eq(2)
                
            });
        });
    });

    
});

