/* eslint-disable no-undef */
import validateEmailLogin from '../validate';
import setupI18n from '../../config/locales';

setupI18n();


describe('Validate', () => {
  describe('validateEmailLogin', () => {
    it('should return 2 errors if email and password are missing', () => {
      emptyForm = {
        email: '',
        password: '',
      };
      expect(validateEmailLogin(emptyForm)).toEqual({
        email: 'Required',
        password: 'Required',
      });
    });

    it('should return 1 error if email is missing', () => {
      incompleteForm = {
        email: '',
        password: 'password',
      };
      expect(validateEmailLogin(incompleteForm)).toEqual({
        email: 'Required',
      });
    });

    it('should return 1 error if password is missing', () => {
      incompleteForm = {
        email: 'existing_user@example.com',
        password: '',
      };
      expect(validateEmailLogin(incompleteForm)).toEqual({
        password: 'Required',
      });
    });


    it('should return no error if both fields are filled', () => {
      goodForm = {
        email: 'existing_user@example.com',
        password: 'password',
      };
      expect(validateEmailLogin(goodForm)).toEqual({});
    });
  });
});
