FedaPay.init('.fpay', {
    public_key: 'pk_live_mn14a0fK8hcJBosWNPxSNonK',
    transaction: {
        amount: 1000,
        description: 'Buy my product'
    },
    customer: {
        email: 'johndoe@gmail.com',
        lastname: 'Doe',
        firstname: 'John',
    }
});