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

    it('GET query parameters', () => {
        const params = { name: "id labore ex et quam laborum", };

        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/comments',
            qs: params
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                console.log(response.body);
                expect(response.body[0].name).to.eq('id labore ex et quam laborum')
                expect(response.body[0].body).contain('laudantium enim quasi')
                expect(response.body[0]).has.property('email')
                expect(response.body).has.length(1)
            });
    });

    it('POST login and creating access token', () => {
        let accessToken = null;

        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: 'emilys',
                password: 'emilyspass',
                expiresInMinins: 50
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                accessToken = response.body.accessToken
                console.log(accessToken);
            });
    });

    it('Fetching cookies', () => {
        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: 'sophiab',
                password: 'sophiabpass',
                expiresInMinins: 50
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.getCookies().then((cookies) => {
                    cy.log('Cookies:', cookies);
                });

            });
    });
});
