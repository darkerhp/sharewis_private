/* eslint-disable no-undef */
import { checkStatus, checkResult } from '../apiUtils';


describe('API Utils', () => {
  describe('checkStatus', () => {
    it('should validate a successful api response', () => {
      fakeResponse = { ok: true };
      expect(checkStatus(fakeResponse)).toBeTruthy();
    });

    it('should fail a bad api response', () => {
      fakeResponse = { ok: false, statusText: undefined };
      expect(() => checkStatus(fakeResponse)).toThrow();
    });
  });

  describe('checkResult', () => {
    it('should validate a response against a pattern', () => {
      const fakeResponse = { ok: true, id: 1 };
      const pattern = result => result.id;
      expect(checkResult(fakeResponse, pattern)).toBeTruthy();
    });

    it('should throw an error if validation fail', () => {
      fakeResponse = { ok: true };
      const pattern = result => result.id;
      expect(() => checkResult(fakeResponse, pattern)).toThrow();
    });
  });
});
