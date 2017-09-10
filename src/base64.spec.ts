import { decode, encode } from './base64';

describe('base64', () => {
  it('should base64 encode and decode', () => {
    const bytes = new Uint8Array(new ArrayBuffer(5));
    bytes.set([1, 2, 3, 4, 5]);

    const b64 = encode(bytes.buffer);
    expect(b64).toEqual('AQIDBAU=');
    const bytesOut = decode(b64);
    expect(bytesOut).toEqual(bytes);
  });

  it('should decode edge values fine', () => {
    // This is valid base 64, but when encoding the byte array this string
    // represents, standard encoding would choose a 'g' instead of a 't'.
    const b64 = 'foocat==';
    const b64Standard = encode(decode(b64).buffer);
    expect(b64Standard).toEqual('foocag==');
  });

  it('should reject improper base64', () => {
    expect(() => { decode('abc'); }).toThrowError('Bad length: 3');
    expect(() => { decode('123%'); })
        .toThrowError('Invalid base64 encoded value');
  });
});
