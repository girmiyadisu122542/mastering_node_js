const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute-', () => {
    it('Should return positive number if input is positve', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('Should return positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('Should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('Should return greeting message', () => {
        const result = lib.greet('Girmay');
        //   expect(result).toBe('Wellcome Girmay'); // this draws many erros
        expect(result).toMatch(/Girmay/);
        expect(result).toContain('Girmay');
    });
});

describe('Get currencies', () => {
    it('Should return curencies', () => {
        const result = lib.getCurrencies();
        //To general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // to specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('BIRR');
        expect(result[2]).toBe('EURO');
        expect(result.length).toBe(3);

        //Proper way
        expect(result).toContain('USD');
        expect(result).toContain('BIRR');
        expect(result).toContain('EURO');

        //IDEAL WAY
        expect(result).toEqual(expect.arrayContaining(['USD', 'EURO', 'BIRR']));

    });
});

describe('get products', () => {
    it('Should return product with a given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toBe({id: 1, price: 10 });
        // expect(result).toEqual({id: 1, price: 10 });
        expect(result).toMatchObject({id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    });
});

//excption testing
describe('registerUser', () => {
    it('should throw if username is falsy ', ()=>{ 
        const args = [null, NaN, '', undefined, 0, false ];

        args.forEach(a => {
            expect(() =>{ lib.registerUser(a)}).toThrow();
        });
    });
    it('should retun username if a valid username is passed', () => {
        const result = lib.registerUser('Girmay');
        expect(result).toMatchObject({username: 'Girmay'});
        expect(result.id).toBeGreaterThan(0);
    });
});

//Mock funciton

describe('applyDiscount', () => {
    it('should apply 10% discount if the customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            
            return {id: customerId, points: 20}
        }
        const order = { customerId: 1, totalPrice: 10}
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send email if the order is complete', () => {
        // db.getCustomerSync = function(customerId) {
        //     return { email: 'a'};
        // }
        // let mailSent = false;
        // mail.send = function(email, message) {
        //     mailSent = true;
        // }
        // lib.notifyCustomer({customerId: 1});
        // expect(mailSent).toBe(true);

        // using mock funciton
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1});
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    });
});

