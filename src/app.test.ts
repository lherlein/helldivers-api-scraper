import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import {
    RawInfo,
    RawStatus,
    PlanetStatusWithName,
    ResponseStandard
} from "./types";
import { expectTypeOf } from 'expect-type';
import { app, appEndpoints} from './app';

// test the app endpoints
describe('app endpoints', () => {
    it('should return a 200 status', async () => {
        const res = await app.get('/');
        expect(res.status).toBe(200);
    });
});