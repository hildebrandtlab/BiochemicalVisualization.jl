// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const REVISION = '151';
const MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
};
const TOUCH = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
};
const PCFShadowMap = 1;
const VSMShadowMap = 3;
const FrontSide = 0;
const BackSide = 1;
const DoubleSide = 2;
const NoBlending = 0;
const NormalBlending = 1;
const AddEquation = 100;
const MinEquation = 103;
const MaxEquation = 104;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const LessEqualDepth = 3;
const MultiplyOperation = 0;
const NoToneMapping = 0;
const UVMapping = 300;
const CubeReflectionMapping = 301;
const CubeRefractionMapping = 302;
const CubeUVReflectionMapping = 306;
const ClampToEdgeWrapping = 1001;
const NearestFilter = 1003;
const LinearFilter = 1006;
const LinearMipmapLinearFilter = 1008;
const UnsignedByteType = 1009;
const UnsignedIntType = 1014;
const FloatType = 1015;
const HalfFloatType = 1016;
const UnsignedInt248Type = 1020;
const RGBAFormat = 1023;
const DepthFormat = 1026;
const DepthStencilFormat = 1027;
const InterpolateDiscrete = 2300;
const InterpolateLinear = 2301;
const ZeroCurvatureEnding = 2400;
const LinearEncoding = 3000;
const sRGBEncoding = 3001;
const BasicDepthPacking = 3200;
const TangentSpaceNormalMap = 0;
const SRGBColorSpace = 'srgb';
const LinearSRGBColorSpace = 'srgb-linear';
const DisplayP3ColorSpace = 'display-p3';
const KeepStencilOp = 7680;
const AlwaysStencilFunc = 519;
const StaticDrawUsage = 35044;
const GLSL3 = '300 es';
const _SRGBAFormat = 1035;
class EventDispatcher {
    addEventListener(type, listener) {
        if (this._listeners === undefined) this._listeners = {};
        const listeners = this._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    }
    hasEventListener(type, listener) {
        if (this._listeners === undefined) return false;
        const listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    }
    removeEventListener(type, listener) {
        if (this._listeners === undefined) return;
        const listeners = this._listeners;
        const listenerArray = listeners[type];
        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }
    dispatchEvent(event) {
        if (this._listeners === undefined) return;
        const listeners = this._listeners;
        const listenerArray = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;
            const array = listenerArray.slice(0);
            for(let i = 0, l = array.length; i < l; i++){
                array[i].call(this, event);
            }
            event.target = null;
        }
    }
}
const _lut = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '0a',
    '0b',
    '0c',
    '0d',
    '0e',
    '0f',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '1a',
    '1b',
    '1c',
    '1d',
    '1e',
    '1f',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '2a',
    '2b',
    '2c',
    '2d',
    '2e',
    '2f',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '3a',
    '3b',
    '3c',
    '3d',
    '3e',
    '3f',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '4a',
    '4b',
    '4c',
    '4d',
    '4e',
    '4f',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '5a',
    '5b',
    '5c',
    '5d',
    '5e',
    '5f',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '6a',
    '6b',
    '6c',
    '6d',
    '6e',
    '6f',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '7a',
    '7b',
    '7c',
    '7d',
    '7e',
    '7f',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '8a',
    '8b',
    '8c',
    '8d',
    '8e',
    '8f',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
    '9a',
    '9b',
    '9c',
    '9d',
    '9e',
    '9f',
    'a0',
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
    'a9',
    'aa',
    'ab',
    'ac',
    'ad',
    'ae',
    'af',
    'b0',
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'b8',
    'b9',
    'ba',
    'bb',
    'bc',
    'bd',
    'be',
    'bf',
    'c0',
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'ca',
    'cb',
    'cc',
    'cd',
    'ce',
    'cf',
    'd0',
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'd7',
    'd8',
    'd9',
    'da',
    'db',
    'dc',
    'dd',
    'de',
    'df',
    'e0',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'e8',
    'e9',
    'ea',
    'eb',
    'ec',
    'ed',
    'ee',
    'ef',
    'f0',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'fa',
    'fb',
    'fc',
    'fd',
    'fe',
    'ff'
];
const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
function generateUUID() {
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
    return uuid.toLowerCase();
}
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function euclideanModulo(n, m) {
    return (n % m + m) % m;
}
function lerp(x, y, t) {
    return (1 - t) * x + t * y;
}
function isPowerOfTwo(value) {
    return (value & value - 1) === 0 && value !== 0;
}
function floorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}
function denormalize(value, array) {
    switch(array.constructor){
        case Float32Array:
            return value;
        case Uint16Array:
            return value / 65535.0;
        case Uint8Array:
            return value / 255.0;
        case Int16Array:
            return Math.max(value / 32767.0, -1.0);
        case Int8Array:
            return Math.max(value / 127.0, -1.0);
        default:
            throw new Error('Invalid component type.');
    }
}
function normalize(value, array) {
    switch(array.constructor){
        case Float32Array:
            return value;
        case Uint16Array:
            return Math.round(value * 65535.0);
        case Uint8Array:
            return Math.round(value * 255.0);
        case Int16Array:
            return Math.round(value * 32767.0);
        case Int8Array:
            return Math.round(value * 127.0);
        default:
            throw new Error('Invalid component type.');
    }
}
class Vector2 {
    constructor(x = 0, y = 0){
        Vector2.prototype.isVector2 = true;
        this.x = x;
        this.y = y;
    }
    get width() {
        return this.x;
    }
    set width(value) {
        this.x = value;
    }
    get height() {
        return this.y;
    }
    set height(value) {
        this.y = value;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    applyMatrix3(m) {
        const x = this.x, y = this.y;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }
    clampScalar(minVal, maxVal) {
        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));
        return this;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    roundToZero() {
        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    angle() {
        const angle = Math.atan2(-this.y, -this.x) + Math.PI;
        return angle;
    }
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(clamp(theta, -1, 1));
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        return this;
    }
    equals(v) {
        return v.x === this.x && v.y === this.y;
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        return this;
    }
    rotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
class Matrix3 {
    constructor(){
        Matrix3.prototype.isMatrix3 = true;
        this.elements = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
    }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        const te = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n31;
        te[3] = n12;
        te[4] = n22;
        te[5] = n32;
        te[6] = n13;
        te[7] = n23;
        te[8] = n33;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this;
    }
    copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrix3Column(this, 0);
        yAxis.setFromMatrix3Column(this, 1);
        zAxis.setFromMatrix3Column(this, 2);
        return this;
    }
    setFromMatrix4(m) {
        const me = m.elements;
        this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
        return this;
    }
    multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[3], a13 = ae[6];
        const a21 = ae[1], a22 = ae[4], a23 = ae[7];
        const a31 = ae[2], a32 = ae[5], a33 = ae[8];
        const b11 = be[0], b12 = be[3], b13 = be[6];
        const b21 = be[1], b22 = be[4], b23 = be[7];
        const b31 = be[2], b32 = be[5], b33 = be[8];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;
        return this;
    }
    multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    }
    determinant() {
        const te = this.elements;
        const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }
    invert() {
        const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        const detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;
        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;
        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;
        return this;
    }
    transpose() {
        let tmp;
        const m = this.elements;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    }
    getNormalMatrix(matrix4) {
        return this.setFromMatrix4(matrix4).invert().transpose();
    }
    transposeIntoArray(r) {
        const m = this.elements;
        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];
        return this;
    }
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
        return this;
    }
    scale(sx, sy) {
        this.premultiply(_m3.makeScale(sx, sy));
        return this;
    }
    rotate(theta) {
        this.premultiply(_m3.makeRotation(-theta));
        return this;
    }
    translate(tx, ty) {
        this.premultiply(_m3.makeTranslation(tx, ty));
        return this;
    }
    makeTranslation(x, y) {
        this.set(1, 0, x, 0, 1, y, 0, 0, 1);
        return this;
    }
    makeRotation(theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        this.set(c, -s, 0, s, c, 0, 0, 0, 1);
        return this;
    }
    makeScale(x, y) {
        this.set(x, 0, 0, 0, y, 0, 0, 0, 1);
        return this;
    }
    equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for(let i = 0; i < 9; i++){
            if (te[i] !== me[i]) return false;
        }
        return true;
    }
    fromArray(array, offset = 0) {
        for(let i = 0; i < 9; i++){
            this.elements[i] = array[i + offset];
        }
        return this;
    }
    toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        return array;
    }
    clone() {
        return new this.constructor().fromArray(this.elements);
    }
}
const _m3 = new Matrix3();
function arrayNeedsUint32(array) {
    for(let i = array.length - 1; i >= 0; --i){
        if (array[i] >= 65535) return true;
    }
    return false;
}
({
    Int8Array: Int8Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray: Uint8ClampedArray,
    Int16Array: Int16Array,
    Uint16Array: Uint16Array,
    Int32Array: Int32Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array
});
function createElementNS(name) {
    return document.createElementNS('http://www.w3.org/1999/xhtml', name);
}
function SRGBToLinear(c) {
    return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}
function LinearToSRGB(c) {
    return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}
const LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = new Matrix3().fromArray([
    0.8224621,
    0.0331941,
    0.0170827,
    0.1775380,
    0.9668058,
    0.0723974,
    -0.0000001,
    0.0000001,
    0.9105199
]);
const LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = new Matrix3().fromArray([
    1.2249401,
    -0.0420569,
    -0.0196376,
    -0.2249404,
    1.0420571,
    -0.0786361,
    0.0000001,
    0.0000000,
    1.0982735
]);
function DisplayP3ToLinearSRGB(color) {
    return color.convertSRGBToLinear().applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB);
}
function LinearSRGBToDisplayP3(color) {
    return color.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3).convertLinearToSRGB();
}
const TO_LINEAR = {
    [LinearSRGBColorSpace]: (color)=>color,
    [SRGBColorSpace]: (color)=>color.convertSRGBToLinear(),
    [DisplayP3ColorSpace]: DisplayP3ToLinearSRGB
};
const FROM_LINEAR = {
    [LinearSRGBColorSpace]: (color)=>color,
    [SRGBColorSpace]: (color)=>color.convertLinearToSRGB(),
    [DisplayP3ColorSpace]: LinearSRGBToDisplayP3
};
const ColorManagement = {
    enabled: false,
    get legacyMode () {
        console.warn('THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.');
        return !this.enabled;
    },
    set legacyMode (legacyMode){
        console.warn('THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.');
        this.enabled = !legacyMode;
    },
    get workingColorSpace () {
        return LinearSRGBColorSpace;
    },
    set workingColorSpace (colorSpace){
        console.warn('THREE.ColorManagement: .workingColorSpace is readonly.');
    },
    convert: function(color, sourceColorSpace, targetColorSpace) {
        if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
            return color;
        }
        const sourceToLinear = TO_LINEAR[sourceColorSpace];
        const targetFromLinear = FROM_LINEAR[targetColorSpace];
        if (sourceToLinear === undefined || targetFromLinear === undefined) {
            throw new Error(`Unsupported color space conversion, "${sourceColorSpace}" to "${targetColorSpace}".`);
        }
        return targetFromLinear(sourceToLinear(color));
    },
    fromWorkingColorSpace: function(color, targetColorSpace) {
        return this.convert(color, this.workingColorSpace, targetColorSpace);
    },
    toWorkingColorSpace: function(color, sourceColorSpace) {
        return this.convert(color, sourceColorSpace, this.workingColorSpace);
    }
};
let _canvas;
class ImageUtils {
    static getDataURL(image) {
        if (/^data:/i.test(image.src)) {
            return image.src;
        }
        if (typeof HTMLCanvasElement === 'undefined') {
            return image.src;
        }
        let canvas;
        if (image instanceof HTMLCanvasElement) {
            canvas = image;
        } else {
            if (_canvas === undefined) _canvas = createElementNS('canvas');
            _canvas.width = image.width;
            _canvas.height = image.height;
            const context = _canvas.getContext('2d');
            if (image instanceof ImageData) {
                context.putImageData(image, 0, 0);
            } else {
                context.drawImage(image, 0, 0, image.width, image.height);
            }
            canvas = _canvas;
        }
        if (canvas.width > 2048 || canvas.height > 2048) {
            console.warn('THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', image);
            return canvas.toDataURL('image/jpeg', 0.6);
        } else {
            return canvas.toDataURL('image/png');
        }
    }
    static sRGBToLinear(image) {
        if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
            const canvas = createElementNS('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, image.width, image.height);
            const data = imageData.data;
            for(let i = 0; i < data.length; i++){
                data[i] = SRGBToLinear(data[i] / 255) * 255;
            }
            context.putImageData(imageData, 0, 0);
            return canvas;
        } else if (image.data) {
            const data1 = image.data.slice(0);
            for(let i1 = 0; i1 < data1.length; i1++){
                if (data1 instanceof Uint8Array || data1 instanceof Uint8ClampedArray) {
                    data1[i1] = Math.floor(SRGBToLinear(data1[i1] / 255) * 255);
                } else {
                    data1[i1] = SRGBToLinear(data1[i1]);
                }
            }
            return {
                data: data1,
                width: image.width,
                height: image.height
            };
        } else {
            console.warn('THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.');
            return image;
        }
    }
}
class Source {
    constructor(data = null){
        this.isSource = true;
        this.uuid = generateUUID();
        this.data = data;
        this.version = 0;
    }
    set needsUpdate(value) {
        if (value === true) this.version++;
    }
    toJSON(meta) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        if (!isRootObject && meta.images[this.uuid] !== undefined) {
            return meta.images[this.uuid];
        }
        const output = {
            uuid: this.uuid,
            url: ''
        };
        const data = this.data;
        if (data !== null) {
            let url;
            if (Array.isArray(data)) {
                url = [];
                for(let i = 0, l = data.length; i < l; i++){
                    if (data[i].isDataTexture) {
                        url.push(serializeImage(data[i].image));
                    } else {
                        url.push(serializeImage(data[i]));
                    }
                }
            } else {
                url = serializeImage(data);
            }
            output.url = url;
        }
        if (!isRootObject) {
            meta.images[this.uuid] = output;
        }
        return output;
    }
}
function serializeImage(image) {
    if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
        return ImageUtils.getDataURL(image);
    } else {
        if (image.data) {
            return {
                data: Array.from(image.data),
                width: image.width,
                height: image.height,
                type: image.data.constructor.name
            };
        } else {
            console.warn('THREE.Texture: Unable to serialize Texture.');
            return {};
        }
    }
}
let textureId = 0;
class Texture extends EventDispatcher {
    constructor(image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = 1001, wrapT = 1001, magFilter = 1006, minFilter = 1008, format = 1023, type = 1009, anisotropy = Texture.DEFAULT_ANISOTROPY, encoding = 3000){
        super();
        this.isTexture = true;
        Object.defineProperty(this, 'id', {
            value: textureId++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.source = new Source(image);
        this.mipmaps = [];
        this.mapping = mapping;
        this.channel = 0;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.magFilter = magFilter;
        this.minFilter = minFilter;
        this.anisotropy = anisotropy;
        this.format = format;
        this.internalFormat = null;
        this.type = type;
        this.offset = new Vector2(0, 0);
        this.repeat = new Vector2(1, 1);
        this.center = new Vector2(0, 0);
        this.rotation = 0;
        this.matrixAutoUpdate = true;
        this.matrix = new Matrix3();
        this.generateMipmaps = true;
        this.premultiplyAlpha = false;
        this.flipY = true;
        this.unpackAlignment = 4;
        this.encoding = encoding;
        this.userData = {};
        this.version = 0;
        this.onUpdate = null;
        this.isRenderTargetTexture = false;
        this.needsPMREMUpdate = false;
    }
    get image() {
        return this.source.data;
    }
    set image(value = null) {
        this.source.data = value;
    }
    updateMatrix() {
        this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.name = source.name;
        this.source = source.source;
        this.mipmaps = source.mipmaps.slice(0);
        this.mapping = source.mapping;
        this.channel = source.channel;
        this.wrapS = source.wrapS;
        this.wrapT = source.wrapT;
        this.magFilter = source.magFilter;
        this.minFilter = source.minFilter;
        this.anisotropy = source.anisotropy;
        this.format = source.format;
        this.internalFormat = source.internalFormat;
        this.type = source.type;
        this.offset.copy(source.offset);
        this.repeat.copy(source.repeat);
        this.center.copy(source.center);
        this.rotation = source.rotation;
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrix.copy(source.matrix);
        this.generateMipmaps = source.generateMipmaps;
        this.premultiplyAlpha = source.premultiplyAlpha;
        this.flipY = source.flipY;
        this.unpackAlignment = source.unpackAlignment;
        this.encoding = source.encoding;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        this.needsUpdate = true;
        return this;
    }
    toJSON(meta) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        if (!isRootObject && meta.textures[this.uuid] !== undefined) {
            return meta.textures[this.uuid];
        }
        const output = {
            metadata: {
                version: 4.5,
                type: 'Texture',
                generator: 'Texture.toJSON'
            },
            uuid: this.uuid,
            name: this.name,
            image: this.source.toJSON(meta).uuid,
            mapping: this.mapping,
            channel: this.channel,
            repeat: [
                this.repeat.x,
                this.repeat.y
            ],
            offset: [
                this.offset.x,
                this.offset.y
            ],
            center: [
                this.center.x,
                this.center.y
            ],
            rotation: this.rotation,
            wrap: [
                this.wrapS,
                this.wrapT
            ],
            format: this.format,
            internalFormat: this.internalFormat,
            type: this.type,
            encoding: this.encoding,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,
            flipY: this.flipY,
            generateMipmaps: this.generateMipmaps,
            premultiplyAlpha: this.premultiplyAlpha,
            unpackAlignment: this.unpackAlignment
        };
        if (Object.keys(this.userData).length > 0) output.userData = this.userData;
        if (!isRootObject) {
            meta.textures[this.uuid] = output;
        }
        return output;
    }
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
    transformUv(uv) {
        if (this.mapping !== 300) return uv;
        uv.applyMatrix3(this.matrix);
        if (uv.x < 0 || uv.x > 1) {
            switch(this.wrapS){
                case 1000:
                    uv.x = uv.x - Math.floor(uv.x);
                    break;
                case 1001:
                    uv.x = uv.x < 0 ? 0 : 1;
                    break;
                case 1002:
                    if (Math.abs(Math.floor(uv.x) % 2) === 1) {
                        uv.x = Math.ceil(uv.x) - uv.x;
                    } else {
                        uv.x = uv.x - Math.floor(uv.x);
                    }
                    break;
            }
        }
        if (uv.y < 0 || uv.y > 1) {
            switch(this.wrapT){
                case 1000:
                    uv.y = uv.y - Math.floor(uv.y);
                    break;
                case 1001:
                    uv.y = uv.y < 0 ? 0 : 1;
                    break;
                case 1002:
                    if (Math.abs(Math.floor(uv.y) % 2) === 1) {
                        uv.y = Math.ceil(uv.y) - uv.y;
                    } else {
                        uv.y = uv.y - Math.floor(uv.y);
                    }
                    break;
            }
        }
        if (this.flipY) {
            uv.y = 1 - uv.y;
        }
        return uv;
    }
    set needsUpdate(value) {
        if (value === true) {
            this.version++;
            this.source.needsUpdate = true;
        }
    }
}
Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;
Texture.DEFAULT_ANISOTROPY = 1;
class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 1){
        Vector4.prototype.isVector4 = true;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    get width() {
        return this.z;
    }
    set width(value) {
        this.z = value;
    }
    get height() {
        return this.w;
    }
    set height(value) {
        this.w = value;
    }
    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setZ(z) {
        this.z = z;
        return this;
    }
    setW(w) {
        this.w = w;
        return this;
    }
    setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            case 3:
                this.w = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w !== undefined ? v.w : 1;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        this.w += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        this.w += v.w * s;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        this.w -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    setAxisAngleFromQuaternion(q) {
        this.w = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = q.x / s;
            this.y = q.y / s;
            this.z = q.z / s;
        }
        return this;
    }
    setAxisAngleFromRotationMatrix(m) {
        let angle, x, y, z;
        const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
        if (Math.abs(m12 - m21) < 0.01 && Math.abs(m13 - m31) < 0.01 && Math.abs(m23 - m32) < 0.01) {
            if (Math.abs(m12 + m21) < 0.1 && Math.abs(m13 + m31) < 0.1 && Math.abs(m23 + m32) < 0.1 && Math.abs(m11 + m22 + m33 - 3) < 0.1) {
                this.set(1, 0, 0, 0);
                return this;
            }
            angle = Math.PI;
            const xx = (m11 + 1) / 2;
            const yy = (m22 + 1) / 2;
            const zz = (m33 + 1) / 2;
            const xy = (m12 + m21) / 4;
            const xz = (m13 + m31) / 4;
            const yz = (m23 + m32) / 4;
            if (xx > yy && xx > zz) {
                if (xx < 0.01) {
                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;
                } else {
                    x = Math.sqrt(xx);
                    y = xy / x;
                    z = xz / x;
                }
            } else if (yy > zz) {
                if (yy < 0.01) {
                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;
                } else {
                    y = Math.sqrt(yy);
                    x = xy / y;
                    z = yz / y;
                }
            } else {
                if (zz < 0.01) {
                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;
                } else {
                    z = Math.sqrt(zz);
                    x = xz / z;
                    y = yz / z;
                }
            }
            this.set(x, y, z, angle);
            return this;
        }
        let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
        if (Math.abs(s) < 0.001) s = 1;
        this.x = (m32 - m23) / s;
        this.y = (m13 - m31) / s;
        this.z = (m21 - m12) / s;
        this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
        return this;
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        this.w = Math.min(this.w, v.w);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        this.w = Math.max(this.w, v.w);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        this.w = Math.max(min.w, Math.min(max.w, this.w));
        return this;
    }
    clampScalar(minVal, maxVal) {
        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));
        this.z = Math.max(minVal, Math.min(maxVal, this.z));
        this.w = Math.max(minVal, Math.min(maxVal, this.w));
        return this;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }
    roundToZero() {
        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
        this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        this.w = v1.w + (v2.w - v1.w) * alpha;
        return this;
    }
    equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        this.w = attribute.getW(index);
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}
class WebGLRenderTarget extends EventDispatcher {
    constructor(width = 1, height = 1, options = {}){
        super();
        this.isWebGLRenderTarget = true;
        this.width = width;
        this.height = height;
        this.depth = 1;
        this.scissor = new Vector4(0, 0, width, height);
        this.scissorTest = false;
        this.viewport = new Vector4(0, 0, width, height);
        const image = {
            width: width,
            height: height,
            depth: 1
        };
        this.texture = new Texture(image, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
        this.texture.isRenderTargetTexture = true;
        this.texture.flipY = false;
        this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
        this.texture.internalFormat = options.internalFormat !== undefined ? options.internalFormat : null;
        this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;
        this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
        this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : false;
        this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
        this.samples = options.samples !== undefined ? options.samples : 0;
    }
    setSize(width, height, depth = 1) {
        if (this.width !== width || this.height !== height || this.depth !== depth) {
            this.width = width;
            this.height = height;
            this.depth = depth;
            this.texture.image.width = width;
            this.texture.image.height = height;
            this.texture.image.depth = depth;
            this.dispose();
        }
        this.viewport.set(0, 0, width, height);
        this.scissor.set(0, 0, width, height);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.width = source.width;
        this.height = source.height;
        this.depth = source.depth;
        this.viewport.copy(source.viewport);
        this.texture = source.texture.clone();
        this.texture.isRenderTargetTexture = true;
        const image = Object.assign({}, source.texture.image);
        this.texture.source = new Source(image);
        this.depthBuffer = source.depthBuffer;
        this.stencilBuffer = source.stencilBuffer;
        if (source.depthTexture !== null) this.depthTexture = source.depthTexture.clone();
        this.samples = source.samples;
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
}
class DataArrayTexture extends Texture {
    constructor(data = null, width = 1, height = 1, depth = 1){
        super(null);
        this.isDataArrayTexture = true;
        this.image = {
            data,
            width,
            height,
            depth
        };
        this.magFilter = NearestFilter;
        this.minFilter = NearestFilter;
        this.wrapR = ClampToEdgeWrapping;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
class Data3DTexture extends Texture {
    constructor(data = null, width = 1, height = 1, depth = 1){
        super(null);
        this.isData3DTexture = true;
        this.image = {
            data,
            width,
            height,
            depth
        };
        this.magFilter = NearestFilter;
        this.minFilter = NearestFilter;
        this.wrapR = ClampToEdgeWrapping;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1){
        this.isQuaternion = true;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
        let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
        const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
        if (t === 0) {
            dst[dstOffset + 0] = x0;
            dst[dstOffset + 1] = y0;
            dst[dstOffset + 2] = z0;
            dst[dstOffset + 3] = w0;
            return;
        }
        if (t === 1) {
            dst[dstOffset + 0] = x1;
            dst[dstOffset + 1] = y1;
            dst[dstOffset + 2] = z1;
            dst[dstOffset + 3] = w1;
            return;
        }
        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
            let s = 1 - t;
            const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;
            if (sqrSin > Number.EPSILON) {
                const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
                s = Math.sin(s * len) / sin;
                t = Math.sin(t * len) / sin;
            }
            const tDir = t * dir;
            x0 = x0 * s + x1 * tDir;
            y0 = y0 * s + y1 * tDir;
            z0 = z0 * s + z1 * tDir;
            w0 = w0 * s + w1 * tDir;
            if (s === 1 - t) {
                const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;
            }
        }
        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
    }
    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
        const x0 = src0[srcOffset0];
        const y0 = src0[srcOffset0 + 1];
        const z0 = src0[srcOffset0 + 2];
        const w0 = src0[srcOffset0 + 3];
        const x1 = src1[srcOffset1];
        const y1 = src1[srcOffset1 + 1];
        const z1 = src1[srcOffset1 + 2];
        const w1 = src1[srcOffset1 + 3];
        dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
        dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
        dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
        dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
        return dst;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onChangeCallback();
    }
    get w() {
        return this._w;
    }
    set w(value) {
        this._w = value;
        this._onChangeCallback();
    }
    set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this._onChangeCallback();
        return this;
    }
    clone() {
        return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(quaternion) {
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        this._onChangeCallback();
        return this;
    }
    setFromEuler(euler, update) {
        const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
        const cos = Math.cos;
        const sin = Math.sin;
        const c1 = cos(x / 2);
        const c2 = cos(y / 2);
        const c3 = cos(z / 2);
        const s1 = sin(x / 2);
        const s2 = sin(y / 2);
        const s3 = sin(z / 2);
        switch(order){
            case 'XYZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'YXZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'ZXY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'ZYX':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'YZX':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'XZY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            default:
                console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);
        }
        if (update !== false) this._onChangeCallback();
        return this;
    }
    setFromAxisAngle(axis, angle) {
        const halfAngle = angle / 2, s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        this._onChangeCallback();
        return this;
    }
    setFromRotationMatrix(m) {
        const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            this._w = 0.25 / s;
            this._x = (m32 - m23) * s;
            this._y = (m13 - m31) * s;
            this._z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            const s1 = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this._w = (m32 - m23) / s1;
            this._x = 0.25 * s1;
            this._y = (m12 + m21) / s1;
            this._z = (m13 + m31) / s1;
        } else if (m22 > m33) {
            const s2 = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this._w = (m13 - m31) / s2;
            this._x = (m12 + m21) / s2;
            this._y = 0.25 * s2;
            this._z = (m23 + m32) / s2;
        } else {
            const s3 = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this._w = (m21 - m12) / s3;
            this._x = (m13 + m31) / s3;
            this._y = (m23 + m32) / s3;
            this._z = 0.25 * s3;
        }
        this._onChangeCallback();
        return this;
    }
    setFromUnitVectors(vFrom, vTo) {
        let r = vFrom.dot(vTo) + 1;
        if (r < Number.EPSILON) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                this._x = -vFrom.y;
                this._y = vFrom.x;
                this._z = 0;
                this._w = r;
            } else {
                this._x = 0;
                this._y = -vFrom.z;
                this._z = vFrom.y;
                this._w = r;
            }
        } else {
            this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
            this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
            this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
            this._w = r;
        }
        return this.normalize();
    }
    angleTo(q) {
        return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
    }
    rotateTowards(q, step) {
        const angle = this.angleTo(q);
        if (angle === 0) return this;
        const t = Math.min(1, step / angle);
        this.slerp(q, t);
        return this;
    }
    identity() {
        return this.set(0, 0, 0, 1);
    }
    invert() {
        return this.conjugate();
    }
    conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this._onChangeCallback();
        return this;
    }
    dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
        let l = this.length();
        if (l === 0) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        } else {
            l = 1 / l;
            this._x = this._x * l;
            this._y = this._y * l;
            this._z = this._z * l;
            this._w = this._w * l;
        }
        this._onChangeCallback();
        return this;
    }
    multiply(q) {
        return this.multiplyQuaternions(this, q);
    }
    premultiply(q) {
        return this.multiplyQuaternions(q, this);
    }
    multiplyQuaternions(a, b) {
        const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
        const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        this._onChangeCallback();
        return this;
    }
    slerp(qb, t) {
        if (t === 0) return this;
        if (t === 1) return this.copy(qb);
        const x = this._x, y = this._y, z = this._z, w = this._w;
        let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0) {
            this._w = -qb._w;
            this._x = -qb._x;
            this._y = -qb._y;
            this._z = -qb._z;
            cosHalfTheta = -cosHalfTheta;
        } else {
            this.copy(qb);
        }
        if (cosHalfTheta >= 1.0) {
            this._w = w;
            this._x = x;
            this._y = y;
            this._z = z;
            return this;
        }
        const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
        if (sqrSinHalfTheta <= Number.EPSILON) {
            const s = 1 - t;
            this._w = s * w + t * this._w;
            this._x = s * x + t * this._x;
            this._y = s * y + t * this._y;
            this._z = s * z + t * this._z;
            this.normalize();
            this._onChangeCallback();
            return this;
        }
        const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
        const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this._w = w * ratioA + this._w * ratioB;
        this._x = x * ratioA + this._x * ratioB;
        this._y = y * ratioA + this._y * ratioB;
        this._z = z * ratioA + this._z * ratioB;
        this._onChangeCallback();
        return this;
    }
    slerpQuaternions(qa, qb, t) {
        return this.copy(qa).slerp(qb, t);
    }
    random() {
        const u1 = Math.random();
        const sqrt1u1 = Math.sqrt(1 - u1);
        const sqrtu1 = Math.sqrt(u1);
        const u2 = 2 * Math.PI * Math.random();
        const u3 = 2 * Math.PI * Math.random();
        return this.set(sqrt1u1 * Math.cos(u2), sqrtu1 * Math.sin(u3), sqrtu1 * Math.cos(u3), sqrt1u1 * Math.sin(u2));
    }
    equals(quaternion) {
        return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
    fromArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this._onChangeCallback();
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this._x = attribute.getX(index);
        this._y = attribute.getY(index);
        this._z = attribute.getZ(index);
        this._w = attribute.getW(index);
        return this;
    }
    toJSON() {
        return this.toArray();
    }
    _onChange(callback) {
        this._onChangeCallback = callback;
        return this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x;
        yield this._y;
        yield this._z;
        yield this._w;
    }
}
class Vector3 {
    constructor(x = 0, y = 0, z = 0){
        Vector3.prototype.isVector3 = true;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    set(x, y, z) {
        if (z === undefined) z = this.z;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setZ(z) {
        this.z = z;
        return this;
    }
    setComponent(index, value) {
        switch(index){
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }
    getComponent(index) {
        switch(index){
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }
    addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }
    applyEuler(euler) {
        return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
    }
    applyAxisAngle(axis, angle) {
        return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
    }
    applyMatrix3(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }
    applyNormalMatrix(m) {
        return this.applyMatrix3(m).normalize();
    }
    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        return this;
    }
    applyQuaternion(q) {
        const x = this.x, y = this.y, z = this.z;
        const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }
    project(camera) {
        return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }
    unproject(camera) {
        return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }
    transformDirection(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize();
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    }
    clampScalar(minVal, maxVal) {
        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));
        this.z = Math.max(minVal, Math.min(maxVal, this.z));
        return this;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    roundToZero() {
        this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        return this;
    }
    cross(v) {
        return this.crossVectors(this, v);
    }
    crossVectors(a, b) {
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    projectOnVector(v) {
        const denominator = v.lengthSq();
        if (denominator === 0) return this.set(0, 0, 0);
        const scalar = v.dot(this) / denominator;
        return this.copy(v).multiplyScalar(scalar);
    }
    projectOnPlane(planeNormal) {
        _vector$b.copy(this).projectOnVector(planeNormal);
        return this.sub(_vector$b);
    }
    reflect(normal) {
        return this.sub(_vector$b.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(clamp(theta, -1, 1));
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }
    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    setFromSpherical(s) {
        return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }
    setFromSphericalCoords(radius, phi, theta) {
        const sinPhiRadius = Math.sin(phi) * radius;
        this.x = sinPhiRadius * Math.sin(theta);
        this.y = Math.cos(phi) * radius;
        this.z = sinPhiRadius * Math.cos(theta);
        return this;
    }
    setFromCylindrical(c) {
        return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }
    setFromCylindricalCoords(radius, theta, y) {
        this.x = radius * Math.sin(theta);
        this.y = y;
        this.z = radius * Math.cos(theta);
        return this;
    }
    setFromMatrixPosition(m) {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }
    setFromMatrixScale(m) {
        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    }
    setFromMatrixColumn(m, index) {
        return this.fromArray(m.elements, index * 4);
    }
    setFromMatrix3Column(m, index) {
        return this.fromArray(m.elements, index * 3);
    }
    setFromEuler(e) {
        this.x = e._x;
        this.y = e._y;
        this.z = e._z;
        return this;
    }
    setFromColor(c) {
        this.x = c.r;
        this.y = c.g;
        this.z = c.b;
        return this;
    }
    equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z;
    }
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    }
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    }
    randomDirection() {
        const u = (Math.random() - 0.5) * 2;
        const t = Math.random() * Math.PI * 2;
        const f = Math.sqrt(1 - u ** 2);
        this.x = f * Math.cos(t);
        this.y = f * Math.sin(t);
        this.z = u;
        return this;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
const _vector$b = new Vector3();
const _quaternion$4 = new Quaternion();
class Box3 {
    constructor(min = new Vector3(+Infinity, +Infinity, +Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)){
        this.isBox3 = true;
        this.min = min;
        this.max = max;
    }
    set(min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }
    setFromArray(array) {
        this.makeEmpty();
        for(let i = 0, il = array.length; i < il; i += 3){
            this.expandByPoint(_vector$a.fromArray(array, i));
        }
        return this;
    }
    setFromBufferAttribute(attribute) {
        this.makeEmpty();
        for(let i = 0, il = attribute.count; i < il; i++){
            this.expandByPoint(_vector$a.fromBufferAttribute(attribute, i));
        }
        return this;
    }
    setFromPoints(points) {
        this.makeEmpty();
        for(let i = 0, il = points.length; i < il; i++){
            this.expandByPoint(points[i]);
        }
        return this;
    }
    setFromCenterAndSize(center, size) {
        const halfSize = _vector$a.copy(size).multiplyScalar(0.5);
        this.min.copy(center).sub(halfSize);
        this.max.copy(center).add(halfSize);
        return this;
    }
    setFromObject(object, precise = false) {
        this.makeEmpty();
        return this.expandByObject(object, precise);
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }
    makeEmpty() {
        this.min.x = this.min.y = this.min.z = +Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this;
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(target) {
        return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(target) {
        return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
    }
    expandByPoint(point) {
        this.min.min(point);
        this.max.max(point);
        return this;
    }
    expandByVector(vector) {
        this.min.sub(vector);
        this.max.add(vector);
        return this;
    }
    expandByScalar(scalar) {
        this.min.addScalar(-scalar);
        this.max.addScalar(scalar);
        return this;
    }
    expandByObject(object, precise = false) {
        object.updateWorldMatrix(false, false);
        if (object.boundingBox !== undefined) {
            if (object.boundingBox === null) {
                object.computeBoundingBox();
            }
            _box$3.copy(object.boundingBox);
            _box$3.applyMatrix4(object.matrixWorld);
            this.union(_box$3);
        } else {
            const geometry = object.geometry;
            if (geometry !== undefined) {
                if (precise && geometry.attributes !== undefined && geometry.attributes.position !== undefined) {
                    const position = geometry.attributes.position;
                    for(let i = 0, l = position.count; i < l; i++){
                        _vector$a.fromBufferAttribute(position, i).applyMatrix4(object.matrixWorld);
                        this.expandByPoint(_vector$a);
                    }
                } else {
                    if (geometry.boundingBox === null) {
                        geometry.computeBoundingBox();
                    }
                    _box$3.copy(geometry.boundingBox);
                    _box$3.applyMatrix4(object.matrixWorld);
                    this.union(_box$3);
                }
            }
        }
        const children = object.children;
        for(let i1 = 0, l1 = children.length; i1 < l1; i1++){
            this.expandByObject(children[i1], precise);
        }
        return this;
    }
    containsPoint(point) {
        return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
    }
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
    getParameter(point, target) {
        return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(box) {
        return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
    }
    intersectsSphere(sphere) {
        this.clampPoint(sphere.center, _vector$a);
        return _vector$a.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    }
    intersectsPlane(plane) {
        let min, max;
        if (plane.normal.x > 0) {
            min = plane.normal.x * this.min.x;
            max = plane.normal.x * this.max.x;
        } else {
            min = plane.normal.x * this.max.x;
            max = plane.normal.x * this.min.x;
        }
        if (plane.normal.y > 0) {
            min += plane.normal.y * this.min.y;
            max += plane.normal.y * this.max.y;
        } else {
            min += plane.normal.y * this.max.y;
            max += plane.normal.y * this.min.y;
        }
        if (plane.normal.z > 0) {
            min += plane.normal.z * this.min.z;
            max += plane.normal.z * this.max.z;
        } else {
            min += plane.normal.z * this.max.z;
            max += plane.normal.z * this.min.z;
        }
        return min <= -plane.constant && max >= -plane.constant;
    }
    intersectsTriangle(triangle) {
        if (this.isEmpty()) {
            return false;
        }
        this.getCenter(_center);
        _extents.subVectors(this.max, _center);
        _v0$2.subVectors(triangle.a, _center);
        _v1$7.subVectors(triangle.b, _center);
        _v2$4.subVectors(triangle.c, _center);
        _f0.subVectors(_v1$7, _v0$2);
        _f1.subVectors(_v2$4, _v1$7);
        _f2.subVectors(_v0$2, _v2$4);
        let axes = [
            0,
            -_f0.z,
            _f0.y,
            0,
            -_f1.z,
            _f1.y,
            0,
            -_f2.z,
            _f2.y,
            _f0.z,
            0,
            -_f0.x,
            _f1.z,
            0,
            -_f1.x,
            _f2.z,
            0,
            -_f2.x,
            -_f0.y,
            _f0.x,
            0,
            -_f1.y,
            _f1.x,
            0,
            -_f2.y,
            _f2.x,
            0
        ];
        if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
            return false;
        }
        axes = [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
        if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
            return false;
        }
        _triangleNormal.crossVectors(_f0, _f1);
        axes = [
            _triangleNormal.x,
            _triangleNormal.y,
            _triangleNormal.z
        ];
        return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);
    }
    clampPoint(point, target) {
        return target.copy(point).clamp(this.min, this.max);
    }
    distanceToPoint(point) {
        return this.clampPoint(point, _vector$a).distanceTo(point);
    }
    getBoundingSphere(target) {
        if (this.isEmpty()) {
            target.makeEmpty();
        } else {
            this.getCenter(target.center);
            target.radius = this.getSize(_vector$a).length() * 0.5;
        }
        return target;
    }
    intersect(box) {
        this.min.max(box.min);
        this.max.min(box.max);
        if (this.isEmpty()) this.makeEmpty();
        return this;
    }
    union(box) {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }
    applyMatrix4(matrix) {
        if (this.isEmpty()) return this;
        _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
        _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
        _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
        _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
        _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
        _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
        _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
        _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
        this.setFromPoints(_points);
        return this;
    }
    translate(offset) {
        this.min.add(offset);
        this.max.add(offset);
        return this;
    }
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }
}
const _points = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3()
];
const _vector$a = new Vector3();
const _box$3 = new Box3();
const _v0$2 = new Vector3();
const _v1$7 = new Vector3();
const _v2$4 = new Vector3();
const _f0 = new Vector3();
const _f1 = new Vector3();
const _f2 = new Vector3();
const _center = new Vector3();
const _extents = new Vector3();
const _triangleNormal = new Vector3();
const _testAxis = new Vector3();
function satForAxes(axes, v0, v1, v2, extents) {
    for(let i = 0, j = axes.length - 3; i <= j; i += 3){
        _testAxis.fromArray(axes, i);
        const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
        const p0 = v0.dot(_testAxis);
        const p1 = v1.dot(_testAxis);
        const p2 = v2.dot(_testAxis);
        if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
            return false;
        }
    }
    return true;
}
const _box$2 = new Box3();
const _v1$6 = new Vector3();
const _v2$3 = new Vector3();
class Sphere {
    constructor(center = new Vector3(), radius = -1){
        this.center = center;
        this.radius = radius;
    }
    set(center, radius) {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }
    setFromPoints(points, optionalCenter) {
        const center = this.center;
        if (optionalCenter !== undefined) {
            center.copy(optionalCenter);
        } else {
            _box$2.setFromPoints(points).getCenter(center);
        }
        let maxRadiusSq = 0;
        for(let i = 0, il = points.length; i < il; i++){
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
        }
        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }
    copy(sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }
    isEmpty() {
        return this.radius < 0;
    }
    makeEmpty() {
        this.center.set(0, 0, 0);
        this.radius = -1;
        return this;
    }
    containsPoint(point) {
        return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(point) {
        return point.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(sphere) {
        const radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }
    intersectsBox(box) {
        return box.intersectsSphere(this);
    }
    intersectsPlane(plane) {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(point, target) {
        const deltaLengthSq = this.center.distanceToSquared(point);
        target.copy(point);
        if (deltaLengthSq > this.radius * this.radius) {
            target.sub(this.center).normalize();
            target.multiplyScalar(this.radius).add(this.center);
        }
        return target;
    }
    getBoundingBox(target) {
        if (this.isEmpty()) {
            target.makeEmpty();
            return target;
        }
        target.set(this.center, this.center);
        target.expandByScalar(this.radius);
        return target;
    }
    applyMatrix4(matrix) {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }
    translate(offset) {
        this.center.add(offset);
        return this;
    }
    expandByPoint(point) {
        if (this.isEmpty()) {
            this.center.copy(point);
            this.radius = 0;
            return this;
        }
        _v1$6.subVectors(point, this.center);
        const lengthSq = _v1$6.lengthSq();
        if (lengthSq > this.radius * this.radius) {
            const length = Math.sqrt(lengthSq);
            const delta = (length - this.radius) * 0.5;
            this.center.addScaledVector(_v1$6, delta / length);
            this.radius += delta;
        }
        return this;
    }
    union(sphere) {
        if (sphere.isEmpty()) {
            return this;
        }
        if (this.isEmpty()) {
            this.copy(sphere);
            return this;
        }
        if (this.center.equals(sphere.center) === true) {
            this.radius = Math.max(this.radius, sphere.radius);
        } else {
            _v2$3.subVectors(sphere.center, this.center).setLength(sphere.radius);
            this.expandByPoint(_v1$6.copy(sphere.center).add(_v2$3));
            this.expandByPoint(_v1$6.copy(sphere.center).sub(_v2$3));
        }
        return this;
    }
    equals(sphere) {
        return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
const _vector$9 = new Vector3();
const _segCenter = new Vector3();
const _segDir = new Vector3();
const _diff = new Vector3();
const _edge1 = new Vector3();
const _edge2 = new Vector3();
const _normal$1 = new Vector3();
class Ray {
    constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)){
        this.origin = origin;
        this.direction = direction;
    }
    set(origin, direction) {
        this.origin.copy(origin);
        this.direction.copy(direction);
        return this;
    }
    copy(ray) {
        this.origin.copy(ray.origin);
        this.direction.copy(ray.direction);
        return this;
    }
    at(t, target) {
        return target.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(v) {
        this.direction.copy(v).sub(this.origin).normalize();
        return this;
    }
    recast(t) {
        this.origin.copy(this.at(t, _vector$9));
        return this;
    }
    closestPointToPoint(point, target) {
        target.subVectors(point, this.origin);
        const directionDistance = target.dot(this.direction);
        if (directionDistance < 0) {
            return target.copy(this.origin);
        }
        return target.copy(this.origin).addScaledVector(this.direction, directionDistance);
    }
    distanceToPoint(point) {
        return Math.sqrt(this.distanceSqToPoint(point));
    }
    distanceSqToPoint(point) {
        const directionDistance = _vector$9.subVectors(point, this.origin).dot(this.direction);
        if (directionDistance < 0) {
            return this.origin.distanceToSquared(point);
        }
        _vector$9.copy(this.origin).addScaledVector(this.direction, directionDistance);
        return _vector$9.distanceToSquared(point);
    }
    distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
        _segCenter.copy(v0).add(v1).multiplyScalar(0.5);
        _segDir.copy(v1).sub(v0).normalize();
        _diff.copy(this.origin).sub(_segCenter);
        const segExtent = v0.distanceTo(v1) * 0.5;
        const a01 = -this.direction.dot(_segDir);
        const b0 = _diff.dot(this.direction);
        const b1 = -_diff.dot(_segDir);
        const c = _diff.lengthSq();
        const det = Math.abs(1 - a01 * a01);
        let s0, s1, sqrDist, extDet;
        if (det > 0) {
            s0 = a01 * b1 - b0;
            s1 = a01 * b0 - b1;
            extDet = segExtent * det;
            if (s0 >= 0) {
                if (s1 >= -extDet) {
                    if (s1 <= extDet) {
                        const invDet = 1 / det;
                        s0 *= invDet;
                        s1 *= invDet;
                        sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
                    } else {
                        s1 = segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                } else {
                    s1 = -segExtent;
                    s0 = Math.max(0, -(a01 * s1 + b0));
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
            } else {
                if (s1 <= -extDet) {
                    s0 = Math.max(0, -(-a01 * segExtent + b0));
                    s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                } else if (s1 <= extDet) {
                    s0 = 0;
                    s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = s1 * (s1 + 2 * b1) + c;
                } else {
                    s0 = Math.max(0, -(a01 * segExtent + b0));
                    s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
            }
        } else {
            s1 = a01 > 0 ? -segExtent : segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        }
        if (optionalPointOnRay) {
            optionalPointOnRay.copy(this.origin).addScaledVector(this.direction, s0);
        }
        if (optionalPointOnSegment) {
            optionalPointOnSegment.copy(_segCenter).addScaledVector(_segDir, s1);
        }
        return sqrDist;
    }
    intersectSphere(sphere, target) {
        _vector$9.subVectors(sphere.center, this.origin);
        const tca = _vector$9.dot(this.direction);
        const d2 = _vector$9.dot(_vector$9) - tca * tca;
        const radius2 = sphere.radius * sphere.radius;
        if (d2 > radius2) return null;
        const thc = Math.sqrt(radius2 - d2);
        const t0 = tca - thc;
        const t1 = tca + thc;
        if (t1 < 0) return null;
        if (t0 < 0) return this.at(t1, target);
        return this.at(t0, target);
    }
    intersectsSphere(sphere) {
        return this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius;
    }
    distanceToPlane(plane) {
        const denominator = plane.normal.dot(this.direction);
        if (denominator === 0) {
            if (plane.distanceToPoint(this.origin) === 0) {
                return 0;
            }
            return null;
        }
        const t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
        return t >= 0 ? t : null;
    }
    intersectPlane(plane, target) {
        const t = this.distanceToPlane(plane);
        if (t === null) {
            return null;
        }
        return this.at(t, target);
    }
    intersectsPlane(plane) {
        const distToPoint = plane.distanceToPoint(this.origin);
        if (distToPoint === 0) {
            return true;
        }
        const denominator = plane.normal.dot(this.direction);
        if (denominator * distToPoint < 0) {
            return true;
        }
        return false;
    }
    intersectBox(box, target) {
        let tmin, tmax, tymin, tymax, tzmin, tzmax;
        const invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
        const origin = this.origin;
        if (invdirx >= 0) {
            tmin = (box.min.x - origin.x) * invdirx;
            tmax = (box.max.x - origin.x) * invdirx;
        } else {
            tmin = (box.max.x - origin.x) * invdirx;
            tmax = (box.min.x - origin.x) * invdirx;
        }
        if (invdiry >= 0) {
            tymin = (box.min.y - origin.y) * invdiry;
            tymax = (box.max.y - origin.y) * invdiry;
        } else {
            tymin = (box.max.y - origin.y) * invdiry;
            tymax = (box.min.y - origin.y) * invdiry;
        }
        if (tmin > tymax || tymin > tmax) return null;
        if (tymin > tmin || isNaN(tmin)) tmin = tymin;
        if (tymax < tmax || isNaN(tmax)) tmax = tymax;
        if (invdirz >= 0) {
            tzmin = (box.min.z - origin.z) * invdirz;
            tzmax = (box.max.z - origin.z) * invdirz;
        } else {
            tzmin = (box.max.z - origin.z) * invdirz;
            tzmax = (box.min.z - origin.z) * invdirz;
        }
        if (tmin > tzmax || tzmin > tmax) return null;
        if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
        if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
        if (tmax < 0) return null;
        return this.at(tmin >= 0 ? tmin : tmax, target);
    }
    intersectsBox(box) {
        return this.intersectBox(box, _vector$9) !== null;
    }
    intersectTriangle(a, b, c, backfaceCulling, target) {
        _edge1.subVectors(b, a);
        _edge2.subVectors(c, a);
        _normal$1.crossVectors(_edge1, _edge2);
        let DdN = this.direction.dot(_normal$1);
        let sign;
        if (DdN > 0) {
            if (backfaceCulling) return null;
            sign = 1;
        } else if (DdN < 0) {
            sign = -1;
            DdN = -DdN;
        } else {
            return null;
        }
        _diff.subVectors(this.origin, a);
        const DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
        if (DdQxE2 < 0) {
            return null;
        }
        const DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff));
        if (DdE1xQ < 0) {
            return null;
        }
        if (DdQxE2 + DdE1xQ > DdN) {
            return null;
        }
        const QdN = -sign * _diff.dot(_normal$1);
        if (QdN < 0) {
            return null;
        }
        return this.at(QdN / DdN, target);
    }
    applyMatrix4(matrix4) {
        this.origin.applyMatrix4(matrix4);
        this.direction.transformDirection(matrix4);
        return this;
    }
    equals(ray) {
        return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
class Matrix4 {
    constructor(){
        Matrix4.prototype.isMatrix4 = true;
        this.elements = [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
        ];
    }
    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        const te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
    }
    identity() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    clone() {
        return new Matrix4().fromArray(this.elements);
    }
    copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        te[9] = me[9];
        te[10] = me[10];
        te[11] = me[11];
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        te[15] = me[15];
        return this;
    }
    copyPosition(m) {
        const te = this.elements, me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    }
    setFromMatrix3(m) {
        const me = m.elements;
        this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1);
        return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
        xAxis.setFromMatrixColumn(this, 0);
        yAxis.setFromMatrixColumn(this, 1);
        zAxis.setFromMatrixColumn(this, 2);
        return this;
    }
    makeBasis(xAxis, yAxis, zAxis) {
        this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
        return this;
    }
    extractRotation(m) {
        const te = this.elements;
        const me = m.elements;
        const scaleX = 1 / _v1$5.setFromMatrixColumn(m, 0).length();
        const scaleY = 1 / _v1$5.setFromMatrixColumn(m, 1).length();
        const scaleZ = 1 / _v1$5.setFromMatrixColumn(m, 2).length();
        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;
        te[3] = 0;
        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;
        te[7] = 0;
        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    makeRotationFromEuler(euler) {
        const te = this.elements;
        const x = euler.x, y = euler.y, z = euler.z;
        const a = Math.cos(x), b = Math.sin(x);
        const c = Math.cos(y), d = Math.sin(y);
        const e = Math.cos(z), f = Math.sin(z);
        if (euler.order === 'XYZ') {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;
            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;
            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        } else if (euler.order === 'YXZ') {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;
            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;
            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;
        } else if (euler.order === 'ZXY') {
            const ce1 = c * e, cf1 = c * f, de1 = d * e, df1 = d * f;
            te[0] = ce1 - df1 * b;
            te[4] = -a * f;
            te[8] = de1 + cf1 * b;
            te[1] = cf1 + de1 * b;
            te[5] = a * e;
            te[9] = df1 - ce1 * b;
            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        } else if (euler.order === 'ZYX') {
            const ae1 = a * e, af1 = a * f, be1 = b * e, bf1 = b * f;
            te[0] = c * e;
            te[4] = be1 * d - af1;
            te[8] = ae1 * d + bf1;
            te[1] = c * f;
            te[5] = bf1 * d + ae1;
            te[9] = af1 * d - be1;
            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        } else if (euler.order === 'YZX') {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;
            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;
            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        } else if (euler.order === 'XZY') {
            const ac1 = a * c, ad1 = a * d, bc1 = b * c, bd1 = b * d;
            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;
            te[1] = ac1 * f + bd1;
            te[5] = a * e;
            te[9] = ad1 * f - bc1;
            te[2] = bc1 * f - ad1;
            te[6] = b * e;
            te[10] = bd1 * f + ac1;
        }
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }
    makeRotationFromQuaternion(q) {
        return this.compose(_zero, q, _one);
    }
    lookAt(eye, target, up) {
        const te = this.elements;
        _z.subVectors(eye, target);
        if (_z.lengthSq() === 0) {
            _z.z = 1;
        }
        _z.normalize();
        _x.crossVectors(up, _z);
        if (_x.lengthSq() === 0) {
            if (Math.abs(up.z) === 1) {
                _z.x += 0.0001;
            } else {
                _z.z += 0.0001;
            }
            _z.normalize();
            _x.crossVectors(up, _z);
        }
        _x.normalize();
        _y.crossVectors(_z, _x);
        te[0] = _x.x;
        te[4] = _y.x;
        te[8] = _z.x;
        te[1] = _x.y;
        te[5] = _y.y;
        te[9] = _z.y;
        te[2] = _x.z;
        te[6] = _y.z;
        te[10] = _z.z;
        return this;
    }
    multiply(m) {
        return this.multiplyMatrices(this, m);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
        const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return this;
    }
    multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this;
    }
    determinant() {
        const te = this.elements;
        const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
        return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
    }
    transpose() {
        const te = this.elements;
        let tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    }
    setPosition(x, y, z) {
        const te = this.elements;
        if (x.isVector3) {
            te[12] = x.x;
            te[13] = x.y;
            te[14] = x.z;
        } else {
            te[12] = x;
            te[13] = y;
            te[14] = z;
        }
        return this;
    }
    invert() {
        const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
        const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
        return this;
    }
    scale(v) {
        const te = this.elements;
        const x = v.x, y = v.y, z = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this;
    }
    getMaxScaleOnAxis() {
        const te = this.elements;
        const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }
    makeTranslation(x, y, z) {
        this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        return this;
    }
    makeRotationX(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationY(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationZ(theta) {
        const c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    }
    makeRotationAxis(axis, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;
        const x = axis.x, y = axis.y, z = axis.z;
        const tx = t * x, ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this;
    }
    makeScale(x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this;
    }
    makeShear(xy, xz, yx, yz, zx, zy) {
        this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1);
        return this;
    }
    compose(position, quaternion, scale) {
        const te = this.elements;
        const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;
        const sx = scale.x, sy = scale.y, sz = scale.z;
        te[0] = (1 - (yy + zz)) * sx;
        te[1] = (xy + wz) * sx;
        te[2] = (xz - wy) * sx;
        te[3] = 0;
        te[4] = (xy - wz) * sy;
        te[5] = (1 - (xx + zz)) * sy;
        te[6] = (yz + wx) * sy;
        te[7] = 0;
        te[8] = (xz + wy) * sz;
        te[9] = (yz - wx) * sz;
        te[10] = (1 - (xx + yy)) * sz;
        te[11] = 0;
        te[12] = position.x;
        te[13] = position.y;
        te[14] = position.z;
        te[15] = 1;
        return this;
    }
    decompose(position, quaternion, scale) {
        const te = this.elements;
        let sx = _v1$5.set(te[0], te[1], te[2]).length();
        const sy = _v1$5.set(te[4], te[5], te[6]).length();
        const sz = _v1$5.set(te[8], te[9], te[10]).length();
        const det = this.determinant();
        if (det < 0) sx = -sx;
        position.x = te[12];
        position.y = te[13];
        position.z = te[14];
        _m1$2.copy(this);
        const invSX = 1 / sx;
        const invSY = 1 / sy;
        const invSZ = 1 / sz;
        _m1$2.elements[0] *= invSX;
        _m1$2.elements[1] *= invSX;
        _m1$2.elements[2] *= invSX;
        _m1$2.elements[4] *= invSY;
        _m1$2.elements[5] *= invSY;
        _m1$2.elements[6] *= invSY;
        _m1$2.elements[8] *= invSZ;
        _m1$2.elements[9] *= invSZ;
        _m1$2.elements[10] *= invSZ;
        quaternion.setFromRotationMatrix(_m1$2);
        scale.x = sx;
        scale.y = sy;
        scale.z = sz;
        return this;
    }
    makePerspective(left, right, top, bottom, near, far) {
        const te = this.elements;
        const x = 2 * near / (right - left);
        const y = 2 * near / (top - bottom);
        const a = (right + left) / (right - left);
        const b = (top + bottom) / (top - bottom);
        const c = -(far + near) / (far - near);
        const d = -2 * far * near / (far - near);
        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;
        return this;
    }
    makeOrthographic(left, right, top, bottom, near, far) {
        const te = this.elements;
        const w = 1.0 / (right - left);
        const h = 1.0 / (top - bottom);
        const p = 1.0 / (far - near);
        const x = (right + left) * w;
        const y = (top + bottom) * h;
        const z = (far + near) * p;
        te[0] = 2 * w;
        te[4] = 0;
        te[8] = 0;
        te[12] = -x;
        te[1] = 0;
        te[5] = 2 * h;
        te[9] = 0;
        te[13] = -y;
        te[2] = 0;
        te[6] = 0;
        te[10] = -2 * p;
        te[14] = -z;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;
        return this;
    }
    equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for(let i = 0; i < 16; i++){
            if (te[i] !== me[i]) return false;
        }
        return true;
    }
    fromArray(array, offset = 0) {
        for(let i = 0; i < 16; i++){
            this.elements[i] = array[i + offset];
        }
        return this;
    }
    toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array;
    }
}
const _v1$5 = new Vector3();
const _m1$2 = new Matrix4();
const _zero = new Vector3(0, 0, 0);
const _one = new Vector3(1, 1, 1);
const _x = new Vector3();
const _y = new Vector3();
const _z = new Vector3();
const _matrix = new Matrix4();
const _quaternion$3 = new Quaternion();
class Euler {
    constructor(x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER){
        this.isEuler = true;
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onChangeCallback();
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
        this._onChangeCallback();
    }
    set(x, y, z, order = this._order) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
        this._onChangeCallback();
        return this;
    }
    clone() {
        return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(euler) {
        this._x = euler._x;
        this._y = euler._y;
        this._z = euler._z;
        this._order = euler._order;
        this._onChangeCallback();
        return this;
    }
    setFromRotationMatrix(m, order = this._order, update = true) {
        const te = m.elements;
        const m11 = te[0], m12 = te[4], m13 = te[8];
        const m21 = te[1], m22 = te[5], m23 = te[9];
        const m31 = te[2], m32 = te[6], m33 = te[10];
        switch(order){
            case 'XYZ':
                this._y = Math.asin(clamp(m13, -1, 1));
                if (Math.abs(m13) < 0.9999999) {
                    this._x = Math.atan2(-m23, m33);
                    this._z = Math.atan2(-m12, m11);
                } else {
                    this._x = Math.atan2(m32, m22);
                    this._z = 0;
                }
                break;
            case 'YXZ':
                this._x = Math.asin(-clamp(m23, -1, 1));
                if (Math.abs(m23) < 0.9999999) {
                    this._y = Math.atan2(m13, m33);
                    this._z = Math.atan2(m21, m22);
                } else {
                    this._y = Math.atan2(-m31, m11);
                    this._z = 0;
                }
                break;
            case 'ZXY':
                this._x = Math.asin(clamp(m32, -1, 1));
                if (Math.abs(m32) < 0.9999999) {
                    this._y = Math.atan2(-m31, m33);
                    this._z = Math.atan2(-m12, m22);
                } else {
                    this._y = 0;
                    this._z = Math.atan2(m21, m11);
                }
                break;
            case 'ZYX':
                this._y = Math.asin(-clamp(m31, -1, 1));
                if (Math.abs(m31) < 0.9999999) {
                    this._x = Math.atan2(m32, m33);
                    this._z = Math.atan2(m21, m11);
                } else {
                    this._x = 0;
                    this._z = Math.atan2(-m12, m22);
                }
                break;
            case 'YZX':
                this._z = Math.asin(clamp(m21, -1, 1));
                if (Math.abs(m21) < 0.9999999) {
                    this._x = Math.atan2(-m23, m22);
                    this._y = Math.atan2(-m31, m11);
                } else {
                    this._x = 0;
                    this._y = Math.atan2(m13, m33);
                }
                break;
            case 'XZY':
                this._z = Math.asin(-clamp(m12, -1, 1));
                if (Math.abs(m12) < 0.9999999) {
                    this._x = Math.atan2(m32, m22);
                    this._y = Math.atan2(m13, m11);
                } else {
                    this._x = Math.atan2(-m23, m33);
                    this._y = 0;
                }
                break;
            default:
                console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order);
        }
        this._order = order;
        if (update === true) this._onChangeCallback();
        return this;
    }
    setFromQuaternion(q, order, update) {
        _matrix.makeRotationFromQuaternion(q);
        return this.setFromRotationMatrix(_matrix, order, update);
    }
    setFromVector3(v, order = this._order) {
        return this.set(v.x, v.y, v.z, order);
    }
    reorder(newOrder) {
        _quaternion$3.setFromEuler(this);
        return this.setFromQuaternion(_quaternion$3, newOrder);
    }
    equals(euler) {
        return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
    }
    fromArray(array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        if (array[3] !== undefined) this._order = array[3];
        this._onChangeCallback();
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._order;
        return array;
    }
    _onChange(callback) {
        this._onChangeCallback = callback;
        return this;
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x;
        yield this._y;
        yield this._z;
        yield this._order;
    }
}
Euler.DEFAULT_ORDER = 'XYZ';
class Layers {
    constructor(){
        this.mask = 1 | 0;
    }
    set(channel) {
        this.mask = (1 << channel | 0) >>> 0;
    }
    enable(channel) {
        this.mask |= 1 << channel | 0;
    }
    enableAll() {
        this.mask = 0xffffffff | 0;
    }
    toggle(channel) {
        this.mask ^= 1 << channel | 0;
    }
    disable(channel) {
        this.mask &= ~(1 << channel | 0);
    }
    disableAll() {
        this.mask = 0;
    }
    test(layers) {
        return (this.mask & layers.mask) !== 0;
    }
    isEnabled(channel) {
        return (this.mask & (1 << channel | 0)) !== 0;
    }
}
let _object3DId = 0;
const _v1$4 = new Vector3();
const _q1 = new Quaternion();
const _m1$1 = new Matrix4();
const _target = new Vector3();
const _position$3 = new Vector3();
const _scale$2 = new Vector3();
const _quaternion$2 = new Quaternion();
const _xAxis = new Vector3(1, 0, 0);
const _yAxis = new Vector3(0, 1, 0);
const _zAxis = new Vector3(0, 0, 1);
const _addedEvent = {
    type: 'added'
};
const _removedEvent = {
    type: 'removed'
};
class Object3D extends EventDispatcher {
    constructor(){
        super();
        this.isObject3D = true;
        Object.defineProperty(this, 'id', {
            value: _object3DId++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.type = 'Object3D';
        this.parent = null;
        this.children = [];
        this.up = Object3D.DEFAULT_UP.clone();
        const position = new Vector3();
        const rotation = new Euler();
        const quaternion = new Quaternion();
        const scale = new Vector3(1, 1, 1);
        function onRotationChange() {
            quaternion.setFromEuler(rotation, false);
        }
        function onQuaternionChange() {
            rotation.setFromQuaternion(quaternion, undefined, false);
        }
        rotation._onChange(onRotationChange);
        quaternion._onChange(onQuaternionChange);
        Object.defineProperties(this, {
            position: {
                configurable: true,
                enumerable: true,
                value: position
            },
            rotation: {
                configurable: true,
                enumerable: true,
                value: rotation
            },
            quaternion: {
                configurable: true,
                enumerable: true,
                value: quaternion
            },
            scale: {
                configurable: true,
                enumerable: true,
                value: scale
            },
            modelViewMatrix: {
                value: new Matrix4()
            },
            normalMatrix: {
                value: new Matrix3()
            }
        });
        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();
        this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
        this.matrixWorldNeedsUpdate = false;
        this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
        this.layers = new Layers();
        this.visible = true;
        this.castShadow = false;
        this.receiveShadow = false;
        this.frustumCulled = true;
        this.renderOrder = 0;
        this.animations = [];
        this.userData = {};
    }
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(matrix) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        this.matrix.premultiply(matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(q) {
        this.quaternion.premultiply(q);
        return this;
    }
    setRotationFromAxisAngle(axis, angle) {
        this.quaternion.setFromAxisAngle(axis, angle);
    }
    setRotationFromEuler(euler) {
        this.quaternion.setFromEuler(euler, true);
    }
    setRotationFromMatrix(m) {
        this.quaternion.setFromRotationMatrix(m);
    }
    setRotationFromQuaternion(q) {
        this.quaternion.copy(q);
    }
    rotateOnAxis(axis, angle) {
        _q1.setFromAxisAngle(axis, angle);
        this.quaternion.multiply(_q1);
        return this;
    }
    rotateOnWorldAxis(axis, angle) {
        _q1.setFromAxisAngle(axis, angle);
        this.quaternion.premultiply(_q1);
        return this;
    }
    rotateX(angle) {
        return this.rotateOnAxis(_xAxis, angle);
    }
    rotateY(angle) {
        return this.rotateOnAxis(_yAxis, angle);
    }
    rotateZ(angle) {
        return this.rotateOnAxis(_zAxis, angle);
    }
    translateOnAxis(axis, distance) {
        _v1$4.copy(axis).applyQuaternion(this.quaternion);
        this.position.add(_v1$4.multiplyScalar(distance));
        return this;
    }
    translateX(distance) {
        return this.translateOnAxis(_xAxis, distance);
    }
    translateY(distance) {
        return this.translateOnAxis(_yAxis, distance);
    }
    translateZ(distance) {
        return this.translateOnAxis(_zAxis, distance);
    }
    localToWorld(vector) {
        this.updateWorldMatrix(true, false);
        return vector.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(vector) {
        this.updateWorldMatrix(true, false);
        return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
    }
    lookAt(x, y, z) {
        if (x.isVector3) {
            _target.copy(x);
        } else {
            _target.set(x, y, z);
        }
        const parent = this.parent;
        this.updateWorldMatrix(true, false);
        _position$3.setFromMatrixPosition(this.matrixWorld);
        if (this.isCamera || this.isLight) {
            _m1$1.lookAt(_position$3, _target, this.up);
        } else {
            _m1$1.lookAt(_target, _position$3, this.up);
        }
        this.quaternion.setFromRotationMatrix(_m1$1);
        if (parent) {
            _m1$1.extractRotation(parent.matrixWorld);
            _q1.setFromRotationMatrix(_m1$1);
            this.quaternion.premultiply(_q1.invert());
        }
    }
    add(object) {
        if (arguments.length > 1) {
            for(let i = 0; i < arguments.length; i++){
                this.add(arguments[i]);
            }
            return this;
        }
        if (object === this) {
            console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
            return this;
        }
        if (object && object.isObject3D) {
            if (object.parent !== null) {
                object.parent.remove(object);
            }
            object.parent = this;
            this.children.push(object);
            object.dispatchEvent(_addedEvent);
        } else {
            console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
        }
        return this;
    }
    remove(object) {
        if (arguments.length > 1) {
            for(let i = 0; i < arguments.length; i++){
                this.remove(arguments[i]);
            }
            return this;
        }
        const index = this.children.indexOf(object);
        if (index !== -1) {
            object.parent = null;
            this.children.splice(index, 1);
            object.dispatchEvent(_removedEvent);
        }
        return this;
    }
    removeFromParent() {
        const parent = this.parent;
        if (parent !== null) {
            parent.remove(this);
        }
        return this;
    }
    clear() {
        for(let i = 0; i < this.children.length; i++){
            const object = this.children[i];
            object.parent = null;
            object.dispatchEvent(_removedEvent);
        }
        this.children.length = 0;
        return this;
    }
    attach(object) {
        this.updateWorldMatrix(true, false);
        _m1$1.copy(this.matrixWorld).invert();
        if (object.parent !== null) {
            object.parent.updateWorldMatrix(true, false);
            _m1$1.multiply(object.parent.matrixWorld);
        }
        object.applyMatrix4(_m1$1);
        this.add(object);
        object.updateWorldMatrix(false, true);
        return this;
    }
    getObjectById(id) {
        return this.getObjectByProperty('id', id);
    }
    getObjectByName(name) {
        return this.getObjectByProperty('name', name);
    }
    getObjectByProperty(name, value) {
        if (this[name] === value) return this;
        for(let i = 0, l = this.children.length; i < l; i++){
            const child = this.children[i];
            const object = child.getObjectByProperty(name, value);
            if (object !== undefined) {
                return object;
            }
        }
        return undefined;
    }
    getObjectsByProperty(name, value) {
        let result = [];
        if (this[name] === value) result.push(this);
        for(let i = 0, l = this.children.length; i < l; i++){
            const childResult = this.children[i].getObjectsByProperty(name, value);
            if (childResult.length > 0) {
                result = result.concat(childResult);
            }
        }
        return result;
    }
    getWorldPosition(target) {
        this.updateWorldMatrix(true, false);
        return target.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(target) {
        this.updateWorldMatrix(true, false);
        this.matrixWorld.decompose(_position$3, target, _scale$2);
        return target;
    }
    getWorldScale(target) {
        this.updateWorldMatrix(true, false);
        this.matrixWorld.decompose(_position$3, _quaternion$2, target);
        return target;
    }
    getWorldDirection(target) {
        this.updateWorldMatrix(true, false);
        const e = this.matrixWorld.elements;
        return target.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {}
    traverse(callback) {
        callback(this);
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++){
            children[i].traverse(callback);
        }
    }
    traverseVisible(callback) {
        if (this.visible === false) return;
        callback(this);
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++){
            children[i].traverseVisible(callback);
        }
    }
    traverseAncestors(callback) {
        const parent = this.parent;
        if (parent !== null) {
            callback(parent);
            parent.traverseAncestors(callback);
        }
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent === null) {
                this.matrixWorld.copy(this.matrix);
            } else {
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
            }
            this.matrixWorldNeedsUpdate = false;
            force = true;
        }
        const children = this.children;
        for(let i = 0, l = children.length; i < l; i++){
            const child = children[i];
            if (child.matrixWorldAutoUpdate === true || force === true) {
                child.updateMatrixWorld(force);
            }
        }
    }
    updateWorldMatrix(updateParents, updateChildren) {
        const parent = this.parent;
        if (updateParents === true && parent !== null && parent.matrixWorldAutoUpdate === true) {
            parent.updateWorldMatrix(true, false);
        }
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.parent === null) {
            this.matrixWorld.copy(this.matrix);
        } else {
            this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }
        if (updateChildren === true) {
            const children = this.children;
            for(let i = 0, l = children.length; i < l; i++){
                const child = children[i];
                if (child.matrixWorldAutoUpdate === true) {
                    child.updateWorldMatrix(false, true);
                }
            }
        }
    }
    toJSON(meta) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        const output = {};
        if (isRootObject) {
            meta = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {}
            };
            output.metadata = {
                version: 4.5,
                type: 'Object',
                generator: 'Object3D.toJSON'
            };
        }
        const object = {};
        object.uuid = this.uuid;
        object.type = this.type;
        if (this.name !== '') object.name = this.name;
        if (this.castShadow === true) object.castShadow = true;
        if (this.receiveShadow === true) object.receiveShadow = true;
        if (this.visible === false) object.visible = false;
        if (this.frustumCulled === false) object.frustumCulled = false;
        if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
        if (Object.keys(this.userData).length > 0) object.userData = this.userData;
        object.layers = this.layers.mask;
        object.matrix = this.matrix.toArray();
        object.up = this.up.toArray();
        if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false;
        if (this.isInstancedMesh) {
            object.type = 'InstancedMesh';
            object.count = this.count;
            object.instanceMatrix = this.instanceMatrix.toJSON();
            if (this.instanceColor !== null) object.instanceColor = this.instanceColor.toJSON();
        }
        function serialize(library, element) {
            if (library[element.uuid] === undefined) {
                library[element.uuid] = element.toJSON(meta);
            }
            return element.uuid;
        }
        if (this.isScene) {
            if (this.background) {
                if (this.background.isColor) {
                    object.background = this.background.toJSON();
                } else if (this.background.isTexture) {
                    object.background = this.background.toJSON(meta).uuid;
                }
            }
            if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) {
                object.environment = this.environment.toJSON(meta).uuid;
            }
        } else if (this.isMesh || this.isLine || this.isPoints) {
            object.geometry = serialize(meta.geometries, this.geometry);
            const parameters = this.geometry.parameters;
            if (parameters !== undefined && parameters.shapes !== undefined) {
                const shapes = parameters.shapes;
                if (Array.isArray(shapes)) {
                    for(let i = 0, l = shapes.length; i < l; i++){
                        const shape = shapes[i];
                        serialize(meta.shapes, shape);
                    }
                } else {
                    serialize(meta.shapes, shapes);
                }
            }
        }
        if (this.isSkinnedMesh) {
            object.bindMode = this.bindMode;
            object.bindMatrix = this.bindMatrix.toArray();
            if (this.skeleton !== undefined) {
                serialize(meta.skeletons, this.skeleton);
                object.skeleton = this.skeleton.uuid;
            }
        }
        if (this.material !== undefined) {
            if (Array.isArray(this.material)) {
                const uuids = [];
                for(let i1 = 0, l1 = this.material.length; i1 < l1; i1++){
                    uuids.push(serialize(meta.materials, this.material[i1]));
                }
                object.material = uuids;
            } else {
                object.material = serialize(meta.materials, this.material);
            }
        }
        if (this.children.length > 0) {
            object.children = [];
            for(let i2 = 0; i2 < this.children.length; i2++){
                object.children.push(this.children[i2].toJSON(meta).object);
            }
        }
        if (this.animations.length > 0) {
            object.animations = [];
            for(let i3 = 0; i3 < this.animations.length; i3++){
                const animation = this.animations[i3];
                object.animations.push(serialize(meta.animations, animation));
            }
        }
        if (isRootObject) {
            const geometries = extractFromCache(meta.geometries);
            const materials = extractFromCache(meta.materials);
            const textures = extractFromCache(meta.textures);
            const images = extractFromCache(meta.images);
            const shapes1 = extractFromCache(meta.shapes);
            const skeletons = extractFromCache(meta.skeletons);
            const animations = extractFromCache(meta.animations);
            const nodes = extractFromCache(meta.nodes);
            if (geometries.length > 0) output.geometries = geometries;
            if (materials.length > 0) output.materials = materials;
            if (textures.length > 0) output.textures = textures;
            if (images.length > 0) output.images = images;
            if (shapes1.length > 0) output.shapes = shapes1;
            if (skeletons.length > 0) output.skeletons = skeletons;
            if (animations.length > 0) output.animations = animations;
            if (nodes.length > 0) output.nodes = nodes;
        }
        output.object = object;
        return output;
        function extractFromCache(cache) {
            const values = [];
            for(const key in cache){
                const data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
    }
    clone(recursive) {
        return new this.constructor().copy(this, recursive);
    }
    copy(source, recursive = true) {
        this.name = source.name;
        this.up.copy(source.up);
        this.position.copy(source.position);
        this.rotation.order = source.rotation.order;
        this.quaternion.copy(source.quaternion);
        this.scale.copy(source.scale);
        this.matrix.copy(source.matrix);
        this.matrixWorld.copy(source.matrixWorld);
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
        this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
        this.layers.mask = source.layers.mask;
        this.visible = source.visible;
        this.castShadow = source.castShadow;
        this.receiveShadow = source.receiveShadow;
        this.frustumCulled = source.frustumCulled;
        this.renderOrder = source.renderOrder;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        if (recursive === true) {
            for(let i = 0; i < source.children.length; i++){
                const child = source.children[i];
                this.add(child.clone());
            }
        }
        return this;
    }
}
Object3D.DEFAULT_UP = new Vector3(0, 1, 0);
Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const _v0$1 = new Vector3();
const _v1$3 = new Vector3();
const _v2$2 = new Vector3();
const _v3$1 = new Vector3();
const _vab = new Vector3();
const _vac = new Vector3();
const _vbc = new Vector3();
const _vap = new Vector3();
const _vbp = new Vector3();
const _vcp = new Vector3();
let warnedGetUV = false;
class Triangle {
    constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()){
        this.a = a;
        this.b = b;
        this.c = c;
    }
    static getNormal(a, b, c, target) {
        target.subVectors(c, b);
        _v0$1.subVectors(a, b);
        target.cross(_v0$1);
        const targetLengthSq = target.lengthSq();
        if (targetLengthSq > 0) {
            return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
        }
        return target.set(0, 0, 0);
    }
    static getBarycoord(point, a, b, c, target) {
        _v0$1.subVectors(c, a);
        _v1$3.subVectors(b, a);
        _v2$2.subVectors(point, a);
        const dot00 = _v0$1.dot(_v0$1);
        const dot01 = _v0$1.dot(_v1$3);
        const dot02 = _v0$1.dot(_v2$2);
        const dot11 = _v1$3.dot(_v1$3);
        const dot12 = _v1$3.dot(_v2$2);
        const denom = dot00 * dot11 - dot01 * dot01;
        if (denom === 0) {
            return target.set(-2, -1, -1);
        }
        const invDenom = 1 / denom;
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        return target.set(1 - u - v, v, u);
    }
    static containsPoint(point, a, b, c) {
        this.getBarycoord(point, a, b, c, _v3$1);
        return _v3$1.x >= 0 && _v3$1.y >= 0 && _v3$1.x + _v3$1.y <= 1;
    }
    static getUV(point, p1, p2, p3, uv1, uv2, uv3, target) {
        if (warnedGetUV === false) {
            console.warn('THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().');
            warnedGetUV = true;
        }
        return this.getInterpolation(point, p1, p2, p3, uv1, uv2, uv3, target);
    }
    static getInterpolation(point, p1, p2, p3, v1, v2, v3, target) {
        this.getBarycoord(point, p1, p2, p3, _v3$1);
        target.setScalar(0);
        target.addScaledVector(v1, _v3$1.x);
        target.addScaledVector(v2, _v3$1.y);
        target.addScaledVector(v3, _v3$1.z);
        return target;
    }
    static isFrontFacing(a, b, c, direction) {
        _v0$1.subVectors(c, b);
        _v1$3.subVectors(a, b);
        return _v0$1.cross(_v1$3).dot(direction) < 0 ? true : false;
    }
    set(a, b, c) {
        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);
        return this;
    }
    setFromPointsAndIndices(points, i0, i1, i2) {
        this.a.copy(points[i0]);
        this.b.copy(points[i1]);
        this.c.copy(points[i2]);
        return this;
    }
    setFromAttributeAndIndices(attribute, i0, i1, i2) {
        this.a.fromBufferAttribute(attribute, i0);
        this.b.fromBufferAttribute(attribute, i1);
        this.c.fromBufferAttribute(attribute, i2);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(triangle) {
        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);
        return this;
    }
    getArea() {
        _v0$1.subVectors(this.c, this.b);
        _v1$3.subVectors(this.a, this.b);
        return _v0$1.cross(_v1$3).length() * 0.5;
    }
    getMidpoint(target) {
        return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(target) {
        return Triangle.getNormal(this.a, this.b, this.c, target);
    }
    getPlane(target) {
        return target.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(point, target) {
        return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
    }
    getUV(point, uv1, uv2, uv3, target) {
        if (warnedGetUV === false) {
            console.warn('THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().');
            warnedGetUV = true;
        }
        return Triangle.getInterpolation(point, this.a, this.b, this.c, uv1, uv2, uv3, target);
    }
    getInterpolation(point, v1, v2, v3, target) {
        return Triangle.getInterpolation(point, this.a, this.b, this.c, v1, v2, v3, target);
    }
    containsPoint(point) {
        return Triangle.containsPoint(point, this.a, this.b, this.c);
    }
    isFrontFacing(direction) {
        return Triangle.isFrontFacing(this.a, this.b, this.c, direction);
    }
    intersectsBox(box) {
        return box.intersectsTriangle(this);
    }
    closestPointToPoint(p, target) {
        const a = this.a, b = this.b, c = this.c;
        let v, w;
        _vab.subVectors(b, a);
        _vac.subVectors(c, a);
        _vap.subVectors(p, a);
        const d1 = _vab.dot(_vap);
        const d2 = _vac.dot(_vap);
        if (d1 <= 0 && d2 <= 0) {
            return target.copy(a);
        }
        _vbp.subVectors(p, b);
        const d3 = _vab.dot(_vbp);
        const d4 = _vac.dot(_vbp);
        if (d3 >= 0 && d4 <= d3) {
            return target.copy(b);
        }
        const vc = d1 * d4 - d3 * d2;
        if (vc <= 0 && d1 >= 0 && d3 <= 0) {
            v = d1 / (d1 - d3);
            return target.copy(a).addScaledVector(_vab, v);
        }
        _vcp.subVectors(p, c);
        const d5 = _vab.dot(_vcp);
        const d6 = _vac.dot(_vcp);
        if (d6 >= 0 && d5 <= d6) {
            return target.copy(c);
        }
        const vb = d5 * d2 - d1 * d6;
        if (vb <= 0 && d2 >= 0 && d6 <= 0) {
            w = d2 / (d2 - d6);
            return target.copy(a).addScaledVector(_vac, w);
        }
        const va = d3 * d6 - d5 * d4;
        if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
            _vbc.subVectors(c, b);
            w = (d4 - d3) / (d4 - d3 + (d5 - d6));
            return target.copy(b).addScaledVector(_vbc, w);
        }
        const denom = 1 / (va + vb + vc);
        v = vb * denom;
        w = vc * denom;
        return target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);
    }
    equals(triangle) {
        return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
    }
}
let materialId = 0;
class Material extends EventDispatcher {
    constructor(){
        super();
        this.isMaterial = true;
        Object.defineProperty(this, 'id', {
            value: materialId++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.type = 'Material';
        this.blending = NormalBlending;
        this.side = FrontSide;
        this.vertexColors = false;
        this.opacity = 1;
        this.transparent = false;
        this.blendSrc = SrcAlphaFactor;
        this.blendDst = OneMinusSrcAlphaFactor;
        this.blendEquation = AddEquation;
        this.blendSrcAlpha = null;
        this.blendDstAlpha = null;
        this.blendEquationAlpha = null;
        this.depthFunc = LessEqualDepth;
        this.depthTest = true;
        this.depthWrite = true;
        this.stencilWriteMask = 0xff;
        this.stencilFunc = AlwaysStencilFunc;
        this.stencilRef = 0;
        this.stencilFuncMask = 0xff;
        this.stencilFail = KeepStencilOp;
        this.stencilZFail = KeepStencilOp;
        this.stencilZPass = KeepStencilOp;
        this.stencilWrite = false;
        this.clippingPlanes = null;
        this.clipIntersection = false;
        this.clipShadows = false;
        this.shadowSide = null;
        this.colorWrite = true;
        this.precision = null;
        this.polygonOffset = false;
        this.polygonOffsetFactor = 0;
        this.polygonOffsetUnits = 0;
        this.dithering = false;
        this.alphaToCoverage = false;
        this.premultipliedAlpha = false;
        this.forceSinglePass = false;
        this.visible = true;
        this.toneMapped = true;
        this.userData = {};
        this.version = 0;
        this._alphaTest = 0;
    }
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(value) {
        if (this._alphaTest > 0 !== value > 0) {
            this.version++;
        }
        this._alphaTest = value;
    }
    onBuild() {}
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
        return this.onBeforeCompile.toString();
    }
    setValues(values) {
        if (values === undefined) return;
        for(const key in values){
            const newValue = values[key];
            if (newValue === undefined) {
                console.warn(`THREE.Material: parameter '${key}' has value of undefined.`);
                continue;
            }
            const currentValue = this[key];
            if (currentValue === undefined) {
                console.warn(`THREE.Material: '${key}' is not a property of THREE.${this.type}.`);
                continue;
            }
            if (currentValue && currentValue.isColor) {
                currentValue.set(newValue);
            } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {
                currentValue.copy(newValue);
            } else {
                this[key] = newValue;
            }
        }
    }
    toJSON(meta) {
        const isRootObject = meta === undefined || typeof meta === 'string';
        if (isRootObject) {
            meta = {
                textures: {},
                images: {}
            };
        }
        const data = {
            metadata: {
                version: 4.5,
                type: 'Material',
                generator: 'Material.toJSON'
            }
        };
        data.uuid = this.uuid;
        data.type = this.type;
        if (this.name !== '') data.name = this.name;
        if (this.color && this.color.isColor) data.color = this.color.getHex();
        if (this.roughness !== undefined) data.roughness = this.roughness;
        if (this.metalness !== undefined) data.metalness = this.metalness;
        if (this.sheen !== undefined) data.sheen = this.sheen;
        if (this.sheenColor && this.sheenColor.isColor) data.sheenColor = this.sheenColor.getHex();
        if (this.sheenRoughness !== undefined) data.sheenRoughness = this.sheenRoughness;
        if (this.emissive && this.emissive.isColor) data.emissive = this.emissive.getHex();
        if (this.emissiveIntensity && this.emissiveIntensity !== 1) data.emissiveIntensity = this.emissiveIntensity;
        if (this.specular && this.specular.isColor) data.specular = this.specular.getHex();
        if (this.specularIntensity !== undefined) data.specularIntensity = this.specularIntensity;
        if (this.specularColor && this.specularColor.isColor) data.specularColor = this.specularColor.getHex();
        if (this.shininess !== undefined) data.shininess = this.shininess;
        if (this.clearcoat !== undefined) data.clearcoat = this.clearcoat;
        if (this.clearcoatRoughness !== undefined) data.clearcoatRoughness = this.clearcoatRoughness;
        if (this.clearcoatMap && this.clearcoatMap.isTexture) {
            data.clearcoatMap = this.clearcoatMap.toJSON(meta).uuid;
        }
        if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) {
            data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(meta).uuid;
        }
        if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
            data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(meta).uuid;
            data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
        }
        if (this.iridescence !== undefined) data.iridescence = this.iridescence;
        if (this.iridescenceIOR !== undefined) data.iridescenceIOR = this.iridescenceIOR;
        if (this.iridescenceThicknessRange !== undefined) data.iridescenceThicknessRange = this.iridescenceThicknessRange;
        if (this.iridescenceMap && this.iridescenceMap.isTexture) {
            data.iridescenceMap = this.iridescenceMap.toJSON(meta).uuid;
        }
        if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture) {
            data.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(meta).uuid;
        }
        if (this.map && this.map.isTexture) data.map = this.map.toJSON(meta).uuid;
        if (this.matcap && this.matcap.isTexture) data.matcap = this.matcap.toJSON(meta).uuid;
        if (this.alphaMap && this.alphaMap.isTexture) data.alphaMap = this.alphaMap.toJSON(meta).uuid;
        if (this.lightMap && this.lightMap.isTexture) {
            data.lightMap = this.lightMap.toJSON(meta).uuid;
            data.lightMapIntensity = this.lightMapIntensity;
        }
        if (this.aoMap && this.aoMap.isTexture) {
            data.aoMap = this.aoMap.toJSON(meta).uuid;
            data.aoMapIntensity = this.aoMapIntensity;
        }
        if (this.bumpMap && this.bumpMap.isTexture) {
            data.bumpMap = this.bumpMap.toJSON(meta).uuid;
            data.bumpScale = this.bumpScale;
        }
        if (this.normalMap && this.normalMap.isTexture) {
            data.normalMap = this.normalMap.toJSON(meta).uuid;
            data.normalMapType = this.normalMapType;
            data.normalScale = this.normalScale.toArray();
        }
        if (this.displacementMap && this.displacementMap.isTexture) {
            data.displacementMap = this.displacementMap.toJSON(meta).uuid;
            data.displacementScale = this.displacementScale;
            data.displacementBias = this.displacementBias;
        }
        if (this.roughnessMap && this.roughnessMap.isTexture) data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
        if (this.metalnessMap && this.metalnessMap.isTexture) data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;
        if (this.emissiveMap && this.emissiveMap.isTexture) data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
        if (this.specularMap && this.specularMap.isTexture) data.specularMap = this.specularMap.toJSON(meta).uuid;
        if (this.specularIntensityMap && this.specularIntensityMap.isTexture) data.specularIntensityMap = this.specularIntensityMap.toJSON(meta).uuid;
        if (this.specularColorMap && this.specularColorMap.isTexture) data.specularColorMap = this.specularColorMap.toJSON(meta).uuid;
        if (this.envMap && this.envMap.isTexture) {
            data.envMap = this.envMap.toJSON(meta).uuid;
            if (this.combine !== undefined) data.combine = this.combine;
        }
        if (this.envMapIntensity !== undefined) data.envMapIntensity = this.envMapIntensity;
        if (this.reflectivity !== undefined) data.reflectivity = this.reflectivity;
        if (this.refractionRatio !== undefined) data.refractionRatio = this.refractionRatio;
        if (this.gradientMap && this.gradientMap.isTexture) {
            data.gradientMap = this.gradientMap.toJSON(meta).uuid;
        }
        if (this.transmission !== undefined) data.transmission = this.transmission;
        if (this.transmissionMap && this.transmissionMap.isTexture) data.transmissionMap = this.transmissionMap.toJSON(meta).uuid;
        if (this.thickness !== undefined) data.thickness = this.thickness;
        if (this.thicknessMap && this.thicknessMap.isTexture) data.thicknessMap = this.thicknessMap.toJSON(meta).uuid;
        if (this.attenuationDistance !== undefined && this.attenuationDistance !== Infinity) data.attenuationDistance = this.attenuationDistance;
        if (this.attenuationColor !== undefined) data.attenuationColor = this.attenuationColor.getHex();
        if (this.size !== undefined) data.size = this.size;
        if (this.shadowSide !== null) data.shadowSide = this.shadowSide;
        if (this.sizeAttenuation !== undefined) data.sizeAttenuation = this.sizeAttenuation;
        if (this.blending !== 1) data.blending = this.blending;
        if (this.side !== 0) data.side = this.side;
        if (this.vertexColors) data.vertexColors = true;
        if (this.opacity < 1) data.opacity = this.opacity;
        if (this.transparent === true) data.transparent = this.transparent;
        data.depthFunc = this.depthFunc;
        data.depthTest = this.depthTest;
        data.depthWrite = this.depthWrite;
        data.colorWrite = this.colorWrite;
        data.stencilWrite = this.stencilWrite;
        data.stencilWriteMask = this.stencilWriteMask;
        data.stencilFunc = this.stencilFunc;
        data.stencilRef = this.stencilRef;
        data.stencilFuncMask = this.stencilFuncMask;
        data.stencilFail = this.stencilFail;
        data.stencilZFail = this.stencilZFail;
        data.stencilZPass = this.stencilZPass;
        if (this.rotation !== undefined && this.rotation !== 0) data.rotation = this.rotation;
        if (this.polygonOffset === true) data.polygonOffset = true;
        if (this.polygonOffsetFactor !== 0) data.polygonOffsetFactor = this.polygonOffsetFactor;
        if (this.polygonOffsetUnits !== 0) data.polygonOffsetUnits = this.polygonOffsetUnits;
        if (this.linewidth !== undefined && this.linewidth !== 1) data.linewidth = this.linewidth;
        if (this.dashSize !== undefined) data.dashSize = this.dashSize;
        if (this.gapSize !== undefined) data.gapSize = this.gapSize;
        if (this.scale !== undefined) data.scale = this.scale;
        if (this.dithering === true) data.dithering = true;
        if (this.alphaTest > 0) data.alphaTest = this.alphaTest;
        if (this.alphaToCoverage === true) data.alphaToCoverage = this.alphaToCoverage;
        if (this.premultipliedAlpha === true) data.premultipliedAlpha = this.premultipliedAlpha;
        if (this.forceSinglePass === true) data.forceSinglePass = this.forceSinglePass;
        if (this.wireframe === true) data.wireframe = this.wireframe;
        if (this.wireframeLinewidth > 1) data.wireframeLinewidth = this.wireframeLinewidth;
        if (this.wireframeLinecap !== 'round') data.wireframeLinecap = this.wireframeLinecap;
        if (this.wireframeLinejoin !== 'round') data.wireframeLinejoin = this.wireframeLinejoin;
        if (this.flatShading === true) data.flatShading = this.flatShading;
        if (this.visible === false) data.visible = false;
        if (this.toneMapped === false) data.toneMapped = false;
        if (this.fog === false) data.fog = false;
        if (Object.keys(this.userData).length > 0) data.userData = this.userData;
        function extractFromCache(cache) {
            const values = [];
            for(const key in cache){
                const data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
        if (isRootObject) {
            const textures = extractFromCache(meta.textures);
            const images = extractFromCache(meta.images);
            if (textures.length > 0) data.textures = textures;
            if (images.length > 0) data.images = images;
        }
        return data;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.name = source.name;
        this.blending = source.blending;
        this.side = source.side;
        this.vertexColors = source.vertexColors;
        this.opacity = source.opacity;
        this.transparent = source.transparent;
        this.blendSrc = source.blendSrc;
        this.blendDst = source.blendDst;
        this.blendEquation = source.blendEquation;
        this.blendSrcAlpha = source.blendSrcAlpha;
        this.blendDstAlpha = source.blendDstAlpha;
        this.blendEquationAlpha = source.blendEquationAlpha;
        this.depthFunc = source.depthFunc;
        this.depthTest = source.depthTest;
        this.depthWrite = source.depthWrite;
        this.stencilWriteMask = source.stencilWriteMask;
        this.stencilFunc = source.stencilFunc;
        this.stencilRef = source.stencilRef;
        this.stencilFuncMask = source.stencilFuncMask;
        this.stencilFail = source.stencilFail;
        this.stencilZFail = source.stencilZFail;
        this.stencilZPass = source.stencilZPass;
        this.stencilWrite = source.stencilWrite;
        const srcPlanes = source.clippingPlanes;
        let dstPlanes = null;
        if (srcPlanes !== null) {
            const n = srcPlanes.length;
            dstPlanes = new Array(n);
            for(let i = 0; i !== n; ++i){
                dstPlanes[i] = srcPlanes[i].clone();
            }
        }
        this.clippingPlanes = dstPlanes;
        this.clipIntersection = source.clipIntersection;
        this.clipShadows = source.clipShadows;
        this.shadowSide = source.shadowSide;
        this.colorWrite = source.colorWrite;
        this.precision = source.precision;
        this.polygonOffset = source.polygonOffset;
        this.polygonOffsetFactor = source.polygonOffsetFactor;
        this.polygonOffsetUnits = source.polygonOffsetUnits;
        this.dithering = source.dithering;
        this.alphaTest = source.alphaTest;
        this.alphaToCoverage = source.alphaToCoverage;
        this.premultipliedAlpha = source.premultipliedAlpha;
        this.forceSinglePass = source.forceSinglePass;
        this.visible = source.visible;
        this.toneMapped = source.toneMapped;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
    set needsUpdate(value) {
        if (value === true) this.version++;
    }
}
const _colorKeywords = {
    'aliceblue': 0xF0F8FF,
    'antiquewhite': 0xFAEBD7,
    'aqua': 0x00FFFF,
    'aquamarine': 0x7FFFD4,
    'azure': 0xF0FFFF,
    'beige': 0xF5F5DC,
    'bisque': 0xFFE4C4,
    'black': 0x000000,
    'blanchedalmond': 0xFFEBCD,
    'blue': 0x0000FF,
    'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A,
    'burlywood': 0xDEB887,
    'cadetblue': 0x5F9EA0,
    'chartreuse': 0x7FFF00,
    'chocolate': 0xD2691E,
    'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED,
    'cornsilk': 0xFFF8DC,
    'crimson': 0xDC143C,
    'cyan': 0x00FFFF,
    'darkblue': 0x00008B,
    'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B,
    'darkgray': 0xA9A9A9,
    'darkgreen': 0x006400,
    'darkgrey': 0xA9A9A9,
    'darkkhaki': 0xBDB76B,
    'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F,
    'darkorange': 0xFF8C00,
    'darkorchid': 0x9932CC,
    'darkred': 0x8B0000,
    'darksalmon': 0xE9967A,
    'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B,
    'darkslategray': 0x2F4F4F,
    'darkslategrey': 0x2F4F4F,
    'darkturquoise': 0x00CED1,
    'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493,
    'deepskyblue': 0x00BFFF,
    'dimgray': 0x696969,
    'dimgrey': 0x696969,
    'dodgerblue': 0x1E90FF,
    'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0,
    'forestgreen': 0x228B22,
    'fuchsia': 0xFF00FF,
    'gainsboro': 0xDCDCDC,
    'ghostwhite': 0xF8F8FF,
    'gold': 0xFFD700,
    'goldenrod': 0xDAA520,
    'gray': 0x808080,
    'green': 0x008000,
    'greenyellow': 0xADFF2F,
    'grey': 0x808080,
    'honeydew': 0xF0FFF0,
    'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C,
    'indigo': 0x4B0082,
    'ivory': 0xFFFFF0,
    'khaki': 0xF0E68C,
    'lavender': 0xE6E6FA,
    'lavenderblush': 0xFFF0F5,
    'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD,
    'lightblue': 0xADD8E6,
    'lightcoral': 0xF08080,
    'lightcyan': 0xE0FFFF,
    'lightgoldenrodyellow': 0xFAFAD2,
    'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90,
    'lightgrey': 0xD3D3D3,
    'lightpink': 0xFFB6C1,
    'lightsalmon': 0xFFA07A,
    'lightseagreen': 0x20B2AA,
    'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899,
    'lightslategrey': 0x778899,
    'lightsteelblue': 0xB0C4DE,
    'lightyellow': 0xFFFFE0,
    'lime': 0x00FF00,
    'limegreen': 0x32CD32,
    'linen': 0xFAF0E6,
    'magenta': 0xFF00FF,
    'maroon': 0x800000,
    'mediumaquamarine': 0x66CDAA,
    'mediumblue': 0x0000CD,
    'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB,
    'mediumseagreen': 0x3CB371,
    'mediumslateblue': 0x7B68EE,
    'mediumspringgreen': 0x00FA9A,
    'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585,
    'midnightblue': 0x191970,
    'mintcream': 0xF5FFFA,
    'mistyrose': 0xFFE4E1,
    'moccasin': 0xFFE4B5,
    'navajowhite': 0xFFDEAD,
    'navy': 0x000080,
    'oldlace': 0xFDF5E6,
    'olive': 0x808000,
    'olivedrab': 0x6B8E23,
    'orange': 0xFFA500,
    'orangered': 0xFF4500,
    'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA,
    'palegreen': 0x98FB98,
    'paleturquoise': 0xAFEEEE,
    'palevioletred': 0xDB7093,
    'papayawhip': 0xFFEFD5,
    'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F,
    'pink': 0xFFC0CB,
    'plum': 0xDDA0DD,
    'powderblue': 0xB0E0E6,
    'purple': 0x800080,
    'rebeccapurple': 0x663399,
    'red': 0xFF0000,
    'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1,
    'saddlebrown': 0x8B4513,
    'salmon': 0xFA8072,
    'sandybrown': 0xF4A460,
    'seagreen': 0x2E8B57,
    'seashell': 0xFFF5EE,
    'sienna': 0xA0522D,
    'silver': 0xC0C0C0,
    'skyblue': 0x87CEEB,
    'slateblue': 0x6A5ACD,
    'slategray': 0x708090,
    'slategrey': 0x708090,
    'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F,
    'steelblue': 0x4682B4,
    'tan': 0xD2B48C,
    'teal': 0x008080,
    'thistle': 0xD8BFD8,
    'tomato': 0xFF6347,
    'turquoise': 0x40E0D0,
    'violet': 0xEE82EE,
    'wheat': 0xF5DEB3,
    'white': 0xFFFFFF,
    'whitesmoke': 0xF5F5F5,
    'yellow': 0xFFFF00,
    'yellowgreen': 0x9ACD32
};
const _hslA = {
    h: 0,
    s: 0,
    l: 0
};
const _hslB = {
    h: 0,
    s: 0,
    l: 0
};
function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
}
class Color {
    constructor(r, g, b){
        this.isColor = true;
        this.r = 1;
        this.g = 1;
        this.b = 1;
        if (g === undefined && b === undefined) {
            return this.set(r);
        }
        return this.setRGB(r, g, b);
    }
    set(value) {
        if (value && value.isColor) {
            this.copy(value);
        } else if (typeof value === 'number') {
            this.setHex(value);
        } else if (typeof value === 'string') {
            this.setStyle(value);
        }
        return this;
    }
    setScalar(scalar) {
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;
        return this;
    }
    setHex(hex, colorSpace1 = SRGBColorSpace) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        ColorManagement.toWorkingColorSpace(this, colorSpace1);
        return this;
    }
    setRGB(r, g, b, colorSpace1 = ColorManagement.workingColorSpace) {
        this.r = r;
        this.g = g;
        this.b = b;
        ColorManagement.toWorkingColorSpace(this, colorSpace1);
        return this;
    }
    setHSL(h, s, l, colorSpace1 = ColorManagement.workingColorSpace) {
        h = euclideanModulo(h, 1);
        s = clamp(s, 0, 1);
        l = clamp(l, 0, 1);
        if (s === 0) {
            this.r = this.g = this.b = l;
        } else {
            const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
            const q = 2 * l - p;
            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);
        }
        ColorManagement.toWorkingColorSpace(this, colorSpace1);
        return this;
    }
    setStyle(style, colorSpace1 = SRGBColorSpace) {
        function handleAlpha(string) {
            if (string === undefined) return;
            if (parseFloat(string) < 1) {
                console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
            }
        }
        let m;
        if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
            let color;
            const name = m[1];
            const components = m[2];
            switch(name){
                case 'rgb':
                case 'rgba':
                    if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                        this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                        this.b = Math.min(255, parseInt(color[3], 10)) / 255;
                        ColorManagement.toWorkingColorSpace(this, colorSpace1);
                        handleAlpha(color[4]);
                        return this;
                    }
                    if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                        this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                        this.b = Math.min(100, parseInt(color[3], 10)) / 100;
                        ColorManagement.toWorkingColorSpace(this, colorSpace1);
                        handleAlpha(color[4]);
                        return this;
                    }
                    break;
                case 'hsl':
                case 'hsla':
                    if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        const h = parseFloat(color[1]) / 360;
                        const s = parseFloat(color[2]) / 100;
                        const l = parseFloat(color[3]) / 100;
                        handleAlpha(color[4]);
                        return this.setHSL(h, s, l, colorSpace1);
                    }
                    break;
                default:
                    console.warn('THREE.Color: Unknown color model ' + style);
            }
        } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
            const hex = m[1];
            const size = hex.length;
            if (size === 3) {
                return this.setRGB(parseInt(hex.charAt(0), 16) / 15, parseInt(hex.charAt(1), 16) / 15, parseInt(hex.charAt(2), 16) / 15, colorSpace1);
            } else if (size === 6) {
                return this.setHex(parseInt(hex, 16), colorSpace1);
            } else {
                console.warn('THREE.Color: Invalid hex color ' + style);
            }
        } else if (style && style.length > 0) {
            return this.setColorName(style, colorSpace1);
        }
        return this;
    }
    setColorName(style, colorSpace1 = SRGBColorSpace) {
        const hex = _colorKeywords[style.toLowerCase()];
        if (hex !== undefined) {
            this.setHex(hex, colorSpace1);
        } else {
            console.warn('THREE.Color: Unknown color ' + style);
        }
        return this;
    }
    clone() {
        return new this.constructor(this.r, this.g, this.b);
    }
    copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        return this;
    }
    copySRGBToLinear(color) {
        this.r = SRGBToLinear(color.r);
        this.g = SRGBToLinear(color.g);
        this.b = SRGBToLinear(color.b);
        return this;
    }
    copyLinearToSRGB(color) {
        this.r = LinearToSRGB(color.r);
        this.g = LinearToSRGB(color.g);
        this.b = LinearToSRGB(color.b);
        return this;
    }
    convertSRGBToLinear() {
        this.copySRGBToLinear(this);
        return this;
    }
    convertLinearToSRGB() {
        this.copyLinearToSRGB(this);
        return this;
    }
    getHex(colorSpace1 = SRGBColorSpace) {
        ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace1);
        return clamp(_color.r * 255, 0, 255) << 16 ^ clamp(_color.g * 255, 0, 255) << 8 ^ clamp(_color.b * 255, 0, 255) << 0;
    }
    getHexString(colorSpace1 = SRGBColorSpace) {
        return ('000000' + this.getHex(colorSpace1).toString(16)).slice(-6);
    }
    getHSL(target, colorSpace1 = ColorManagement.workingColorSpace) {
        ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace1);
        const r = _color.r, g = _color.g, b = _color.b;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let hue, saturation;
        const lightness = (min + max) / 2.0;
        if (min === max) {
            hue = 0;
            saturation = 0;
        } else {
            const delta = max - min;
            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
            switch(max){
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        target.h = hue;
        target.s = saturation;
        target.l = lightness;
        return target;
    }
    getRGB(target, colorSpace1 = ColorManagement.workingColorSpace) {
        ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace1);
        target.r = _color.r;
        target.g = _color.g;
        target.b = _color.b;
        return target;
    }
    getStyle(colorSpace1 = SRGBColorSpace) {
        ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace1);
        const r = _color.r, g = _color.g, b = _color.b;
        if (colorSpace1 !== SRGBColorSpace) {
            return `color(${colorSpace1} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
        }
        return `rgb(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0})`;
    }
    offsetHSL(h, s, l) {
        this.getHSL(_hslA);
        _hslA.h += h;
        _hslA.s += s;
        _hslA.l += l;
        this.setHSL(_hslA.h, _hslA.s, _hslA.l);
        return this;
    }
    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    }
    addColors(color1, color2) {
        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;
        return this;
    }
    addScalar(s) {
        this.r += s;
        this.g += s;
        this.b += s;
        return this;
    }
    sub(color) {
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);
        return this;
    }
    multiply(color) {
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;
        return this;
    }
    multiplyScalar(s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        return this;
    }
    lerp(color, alpha) {
        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;
        return this;
    }
    lerpColors(color1, color2, alpha) {
        this.r = color1.r + (color2.r - color1.r) * alpha;
        this.g = color1.g + (color2.g - color1.g) * alpha;
        this.b = color1.b + (color2.b - color1.b) * alpha;
        return this;
    }
    lerpHSL(color, alpha) {
        this.getHSL(_hslA);
        color.getHSL(_hslB);
        const h = lerp(_hslA.h, _hslB.h, alpha);
        const s = lerp(_hslA.s, _hslB.s, alpha);
        const l = lerp(_hslA.l, _hslB.l, alpha);
        this.setHSL(h, s, l);
        return this;
    }
    setFromVector3(v) {
        this.r = v.x;
        this.g = v.y;
        this.b = v.z;
        return this;
    }
    applyMatrix3(m) {
        const r = this.r, g = this.g, b = this.b;
        const e = m.elements;
        this.r = e[0] * r + e[3] * g + e[6] * b;
        this.g = e[1] * r + e[4] * g + e[7] * b;
        this.b = e[2] * r + e[5] * g + e[8] * b;
        return this;
    }
    equals(c) {
        return c.r === this.r && c.g === this.g && c.b === this.b;
    }
    fromArray(array, offset = 0) {
        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        return array;
    }
    fromBufferAttribute(attribute, index) {
        this.r = attribute.getX(index);
        this.g = attribute.getY(index);
        this.b = attribute.getZ(index);
        return this;
    }
    toJSON() {
        return this.getHex();
    }
    *[Symbol.iterator]() {
        yield this.r;
        yield this.g;
        yield this.b;
    }
}
const _color = new Color();
Color.NAMES = _colorKeywords;
class MeshBasicMaterial extends Material {
    constructor(parameters){
        super();
        this.isMeshBasicMaterial = true;
        this.type = 'MeshBasicMaterial';
        this.color = new Color(0xffffff);
        this.map = null;
        this.lightMap = null;
        this.lightMapIntensity = 1.0;
        this.aoMap = null;
        this.aoMapIntensity = 1.0;
        this.specularMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.combine = MultiplyOperation;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = 'round';
        this.wireframeLinejoin = 'round';
        this.fog = true;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.map = source.map;
        this.lightMap = source.lightMap;
        this.lightMapIntensity = source.lightMapIntensity;
        this.aoMap = source.aoMap;
        this.aoMapIntensity = source.aoMapIntensity;
        this.specularMap = source.specularMap;
        this.alphaMap = source.alphaMap;
        this.envMap = source.envMap;
        this.combine = source.combine;
        this.reflectivity = source.reflectivity;
        this.refractionRatio = source.refractionRatio;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.wireframeLinecap = source.wireframeLinecap;
        this.wireframeLinejoin = source.wireframeLinejoin;
        this.fog = source.fog;
        return this;
    }
}
_generateTables();
function _generateTables() {
    const buffer = new ArrayBuffer(4);
    const floatView = new Float32Array(buffer);
    const uint32View = new Uint32Array(buffer);
    const baseTable = new Uint32Array(512);
    const shiftTable = new Uint32Array(512);
    for(let i = 0; i < 256; ++i){
        const e = i - 127;
        if (e < -27) {
            baseTable[i] = 0x0000;
            baseTable[i | 0x100] = 0x8000;
            shiftTable[i] = 24;
            shiftTable[i | 0x100] = 24;
        } else if (e < -14) {
            baseTable[i] = 0x0400 >> -e - 14;
            baseTable[i | 0x100] = 0x0400 >> -e - 14 | 0x8000;
            shiftTable[i] = -e - 1;
            shiftTable[i | 0x100] = -e - 1;
        } else if (e <= 15) {
            baseTable[i] = e + 15 << 10;
            baseTable[i | 0x100] = e + 15 << 10 | 0x8000;
            shiftTable[i] = 13;
            shiftTable[i | 0x100] = 13;
        } else if (e < 128) {
            baseTable[i] = 0x7c00;
            baseTable[i | 0x100] = 0xfc00;
            shiftTable[i] = 24;
            shiftTable[i | 0x100] = 24;
        } else {
            baseTable[i] = 0x7c00;
            baseTable[i | 0x100] = 0xfc00;
            shiftTable[i] = 13;
            shiftTable[i | 0x100] = 13;
        }
    }
    const mantissaTable = new Uint32Array(2048);
    const exponentTable = new Uint32Array(64);
    const offsetTable = new Uint32Array(64);
    for(let i1 = 1; i1 < 1024; ++i1){
        let m = i1 << 13;
        let e1 = 0;
        while((m & 0x00800000) === 0){
            m <<= 1;
            e1 -= 0x00800000;
        }
        m &= ~0x00800000;
        e1 += 0x38800000;
        mantissaTable[i1] = m | e1;
    }
    for(let i2 = 1024; i2 < 2048; ++i2){
        mantissaTable[i2] = 0x38000000 + (i2 - 1024 << 13);
    }
    for(let i3 = 1; i3 < 31; ++i3){
        exponentTable[i3] = i3 << 23;
    }
    exponentTable[31] = 0x47800000;
    exponentTable[32] = 0x80000000;
    for(let i4 = 33; i4 < 63; ++i4){
        exponentTable[i4] = 0x80000000 + (i4 - 32 << 23);
    }
    exponentTable[63] = 0xc7800000;
    for(let i5 = 1; i5 < 64; ++i5){
        if (i5 !== 32) {
            offsetTable[i5] = 1024;
        }
    }
    return {
        floatView: floatView,
        uint32View: uint32View,
        baseTable: baseTable,
        shiftTable: shiftTable,
        mantissaTable: mantissaTable,
        exponentTable: exponentTable,
        offsetTable: offsetTable
    };
}
const _vector$8 = new Vector3();
const _vector2$1 = new Vector2();
class BufferAttribute {
    constructor(array, itemSize, normalized = false){
        if (Array.isArray(array)) {
            throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
        }
        this.isBufferAttribute = true;
        this.name = '';
        this.array = array;
        this.itemSize = itemSize;
        this.count = array !== undefined ? array.length / itemSize : 0;
        this.normalized = normalized;
        this.usage = StaticDrawUsage;
        this.updateRange = {
            offset: 0,
            count: -1
        };
        this.version = 0;
    }
    onUploadCallback() {}
    set needsUpdate(value) {
        if (value === true) this.version++;
    }
    setUsage(value) {
        this.usage = value;
        return this;
    }
    copy(source) {
        this.name = source.name;
        this.array = new source.array.constructor(source.array);
        this.itemSize = source.itemSize;
        this.count = source.count;
        this.normalized = source.normalized;
        this.usage = source.usage;
        return this;
    }
    copyAt(index1, attribute, index2) {
        index1 *= this.itemSize;
        index2 *= attribute.itemSize;
        for(let i = 0, l = this.itemSize; i < l; i++){
            this.array[index1 + i] = attribute.array[index2 + i];
        }
        return this;
    }
    copyArray(array) {
        this.array.set(array);
        return this;
    }
    applyMatrix3(m) {
        if (this.itemSize === 2) {
            for(let i = 0, l = this.count; i < l; i++){
                _vector2$1.fromBufferAttribute(this, i);
                _vector2$1.applyMatrix3(m);
                this.setXY(i, _vector2$1.x, _vector2$1.y);
            }
        } else if (this.itemSize === 3) {
            for(let i1 = 0, l1 = this.count; i1 < l1; i1++){
                _vector$8.fromBufferAttribute(this, i1);
                _vector$8.applyMatrix3(m);
                this.setXYZ(i1, _vector$8.x, _vector$8.y, _vector$8.z);
            }
        }
        return this;
    }
    applyMatrix4(m) {
        for(let i = 0, l = this.count; i < l; i++){
            _vector$8.fromBufferAttribute(this, i);
            _vector$8.applyMatrix4(m);
            this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
        }
        return this;
    }
    applyNormalMatrix(m) {
        for(let i = 0, l = this.count; i < l; i++){
            _vector$8.fromBufferAttribute(this, i);
            _vector$8.applyNormalMatrix(m);
            this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
        }
        return this;
    }
    transformDirection(m) {
        for(let i = 0, l = this.count; i < l; i++){
            _vector$8.fromBufferAttribute(this, i);
            _vector$8.transformDirection(m);
            this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
        }
        return this;
    }
    set(value, offset = 0) {
        this.array.set(value, offset);
        return this;
    }
    getX(index) {
        let x = this.array[index * this.itemSize];
        if (this.normalized) x = denormalize(x, this.array);
        return x;
    }
    setX(index, x) {
        if (this.normalized) x = normalize(x, this.array);
        this.array[index * this.itemSize] = x;
        return this;
    }
    getY(index) {
        let y = this.array[index * this.itemSize + 1];
        if (this.normalized) y = denormalize(y, this.array);
        return y;
    }
    setY(index, y) {
        if (this.normalized) y = normalize(y, this.array);
        this.array[index * this.itemSize + 1] = y;
        return this;
    }
    getZ(index) {
        let z = this.array[index * this.itemSize + 2];
        if (this.normalized) z = denormalize(z, this.array);
        return z;
    }
    setZ(index, z) {
        if (this.normalized) z = normalize(z, this.array);
        this.array[index * this.itemSize + 2] = z;
        return this;
    }
    getW(index) {
        let w = this.array[index * this.itemSize + 3];
        if (this.normalized) w = denormalize(w, this.array);
        return w;
    }
    setW(index, w) {
        if (this.normalized) w = normalize(w, this.array);
        this.array[index * this.itemSize + 3] = w;
        return this;
    }
    setXY(index, x, y) {
        index *= this.itemSize;
        if (this.normalized) {
            x = normalize(x, this.array);
            y = normalize(y, this.array);
        }
        this.array[index + 0] = x;
        this.array[index + 1] = y;
        return this;
    }
    setXYZ(index, x, y, z) {
        index *= this.itemSize;
        if (this.normalized) {
            x = normalize(x, this.array);
            y = normalize(y, this.array);
            z = normalize(z, this.array);
        }
        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;
        return this;
    }
    setXYZW(index, x, y, z, w) {
        index *= this.itemSize;
        if (this.normalized) {
            x = normalize(x, this.array);
            y = normalize(y, this.array);
            z = normalize(z, this.array);
            w = normalize(w, this.array);
        }
        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;
        this.array[index + 3] = w;
        return this;
    }
    onUpload(callback) {
        this.onUploadCallback = callback;
        return this;
    }
    clone() {
        return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
        const data = {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: Array.from(this.array),
            normalized: this.normalized
        };
        if (this.name !== '') data.name = this.name;
        if (this.usage !== 35044) data.usage = this.usage;
        if (this.updateRange.offset !== 0 || this.updateRange.count !== -1) data.updateRange = this.updateRange;
        return data;
    }
    copyColorsArray() {
        console.error('THREE.BufferAttribute: copyColorsArray() was removed in r144.');
    }
    copyVector2sArray() {
        console.error('THREE.BufferAttribute: copyVector2sArray() was removed in r144.');
    }
    copyVector3sArray() {
        console.error('THREE.BufferAttribute: copyVector3sArray() was removed in r144.');
    }
    copyVector4sArray() {
        console.error('THREE.BufferAttribute: copyVector4sArray() was removed in r144.');
    }
}
class Uint16BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized){
        super(new Uint16Array(array), itemSize, normalized);
    }
}
class Uint32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized){
        super(new Uint32Array(array), itemSize, normalized);
    }
}
class Float32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized){
        super(new Float32Array(array), itemSize, normalized);
    }
}
let _id$1 = 0;
const _m1 = new Matrix4();
const _obj = new Object3D();
const _offset = new Vector3();
const _box$1 = new Box3();
const _boxMorphTargets = new Box3();
const _vector$7 = new Vector3();
class BufferGeometry extends EventDispatcher {
    constructor(){
        super();
        this.isBufferGeometry = true;
        Object.defineProperty(this, 'id', {
            value: _id$1++
        });
        this.uuid = generateUUID();
        this.name = '';
        this.type = 'BufferGeometry';
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.morphTargetsRelative = false;
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        this.drawRange = {
            start: 0,
            count: Infinity
        };
        this.userData = {};
    }
    getIndex() {
        return this.index;
    }
    setIndex(index) {
        if (Array.isArray(index)) {
            this.index = new (arrayNeedsUint32(index) ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
        } else {
            this.index = index;
        }
        return this;
    }
    getAttribute(name) {
        return this.attributes[name];
    }
    setAttribute(name, attribute) {
        this.attributes[name] = attribute;
        return this;
    }
    deleteAttribute(name) {
        delete this.attributes[name];
        return this;
    }
    hasAttribute(name) {
        return this.attributes[name] !== undefined;
    }
    addGroup(start, count, materialIndex = 0) {
        this.groups.push({
            start: start,
            count: count,
            materialIndex: materialIndex
        });
    }
    clearGroups() {
        this.groups = [];
    }
    setDrawRange(start, count) {
        this.drawRange.start = start;
        this.drawRange.count = count;
    }
    applyMatrix4(matrix) {
        const position = this.attributes.position;
        if (position !== undefined) {
            position.applyMatrix4(matrix);
            position.needsUpdate = true;
        }
        const normal = this.attributes.normal;
        if (normal !== undefined) {
            const normalMatrix = new Matrix3().getNormalMatrix(matrix);
            normal.applyNormalMatrix(normalMatrix);
            normal.needsUpdate = true;
        }
        const tangent = this.attributes.tangent;
        if (tangent !== undefined) {
            tangent.transformDirection(matrix);
            tangent.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        return this;
    }
    applyQuaternion(q) {
        _m1.makeRotationFromQuaternion(q);
        this.applyMatrix4(_m1);
        return this;
    }
    rotateX(angle) {
        _m1.makeRotationX(angle);
        this.applyMatrix4(_m1);
        return this;
    }
    rotateY(angle) {
        _m1.makeRotationY(angle);
        this.applyMatrix4(_m1);
        return this;
    }
    rotateZ(angle) {
        _m1.makeRotationZ(angle);
        this.applyMatrix4(_m1);
        return this;
    }
    translate(x, y, z) {
        _m1.makeTranslation(x, y, z);
        this.applyMatrix4(_m1);
        return this;
    }
    scale(x, y, z) {
        _m1.makeScale(x, y, z);
        this.applyMatrix4(_m1);
        return this;
    }
    lookAt(vector) {
        _obj.lookAt(vector);
        _obj.updateMatrix();
        this.applyMatrix4(_obj.matrix);
        return this;
    }
    center() {
        this.computeBoundingBox();
        this.boundingBox.getCenter(_offset).negate();
        this.translate(_offset.x, _offset.y, _offset.z);
        return this;
    }
    setFromPoints(points) {
        const position = [];
        for(let i = 0, l = points.length; i < l; i++){
            const point = points[i];
            position.push(point.x, point.y, point.z || 0);
        }
        this.setAttribute('position', new Float32BufferAttribute(position, 3));
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new Box3();
        }
        const position = this.attributes.position;
        const morphAttributesPosition = this.morphAttributes.position;
        if (position && position.isGLBufferAttribute) {
            console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this);
            this.boundingBox.set(new Vector3(-Infinity, -Infinity, -Infinity), new Vector3(+Infinity, +Infinity, +Infinity));
            return;
        }
        if (position !== undefined) {
            this.boundingBox.setFromBufferAttribute(position);
            if (morphAttributesPosition) {
                for(let i = 0, il = morphAttributesPosition.length; i < il; i++){
                    const morphAttribute = morphAttributesPosition[i];
                    _box$1.setFromBufferAttribute(morphAttribute);
                    if (this.morphTargetsRelative) {
                        _vector$7.addVectors(this.boundingBox.min, _box$1.min);
                        this.boundingBox.expandByPoint(_vector$7);
                        _vector$7.addVectors(this.boundingBox.max, _box$1.max);
                        this.boundingBox.expandByPoint(_vector$7);
                    } else {
                        this.boundingBox.expandByPoint(_box$1.min);
                        this.boundingBox.expandByPoint(_box$1.max);
                    }
                }
            }
        } else {
            this.boundingBox.makeEmpty();
        }
        if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
            console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new Sphere();
        }
        const position = this.attributes.position;
        const morphAttributesPosition = this.morphAttributes.position;
        if (position && position.isGLBufferAttribute) {
            console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this);
            this.boundingSphere.set(new Vector3(), Infinity);
            return;
        }
        if (position) {
            const center = this.boundingSphere.center;
            _box$1.setFromBufferAttribute(position);
            if (morphAttributesPosition) {
                for(let i = 0, il = morphAttributesPosition.length; i < il; i++){
                    const morphAttribute = morphAttributesPosition[i];
                    _boxMorphTargets.setFromBufferAttribute(morphAttribute);
                    if (this.morphTargetsRelative) {
                        _vector$7.addVectors(_box$1.min, _boxMorphTargets.min);
                        _box$1.expandByPoint(_vector$7);
                        _vector$7.addVectors(_box$1.max, _boxMorphTargets.max);
                        _box$1.expandByPoint(_vector$7);
                    } else {
                        _box$1.expandByPoint(_boxMorphTargets.min);
                        _box$1.expandByPoint(_boxMorphTargets.max);
                    }
                }
            }
            _box$1.getCenter(center);
            let maxRadiusSq = 0;
            for(let i1 = 0, il1 = position.count; i1 < il1; i1++){
                _vector$7.fromBufferAttribute(position, i1);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$7));
            }
            if (morphAttributesPosition) {
                for(let i2 = 0, il2 = morphAttributesPosition.length; i2 < il2; i2++){
                    const morphAttribute1 = morphAttributesPosition[i2];
                    const morphTargetsRelative = this.morphTargetsRelative;
                    for(let j = 0, jl = morphAttribute1.count; j < jl; j++){
                        _vector$7.fromBufferAttribute(morphAttribute1, j);
                        if (morphTargetsRelative) {
                            _offset.fromBufferAttribute(position, j);
                            _vector$7.add(_offset);
                        }
                        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$7));
                    }
                }
            }
            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
            if (isNaN(this.boundingSphere.radius)) {
                console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
            }
        }
    }
    computeTangents() {
        const index = this.index;
        const attributes = this.attributes;
        if (index === null || attributes.position === undefined || attributes.normal === undefined || attributes.uv === undefined) {
            console.error('THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)');
            return;
        }
        const indices = index.array;
        const positions = attributes.position.array;
        const normals = attributes.normal.array;
        const uvs = attributes.uv.array;
        const nVertices = positions.length / 3;
        if (this.hasAttribute('tangent') === false) {
            this.setAttribute('tangent', new BufferAttribute(new Float32Array(4 * nVertices), 4));
        }
        const tangents = this.getAttribute('tangent').array;
        const tan1 = [], tan2 = [];
        for(let i = 0; i < nVertices; i++){
            tan1[i] = new Vector3();
            tan2[i] = new Vector3();
        }
        const vA = new Vector3(), vB = new Vector3(), vC = new Vector3(), uvA = new Vector2(), uvB = new Vector2(), uvC = new Vector2(), sdir = new Vector3(), tdir = new Vector3();
        function handleTriangle(a, b, c) {
            vA.fromArray(positions, a * 3);
            vB.fromArray(positions, b * 3);
            vC.fromArray(positions, c * 3);
            uvA.fromArray(uvs, a * 2);
            uvB.fromArray(uvs, b * 2);
            uvC.fromArray(uvs, c * 2);
            vB.sub(vA);
            vC.sub(vA);
            uvB.sub(uvA);
            uvC.sub(uvA);
            const r = 1.0 / (uvB.x * uvC.y - uvC.x * uvB.y);
            if (!isFinite(r)) return;
            sdir.copy(vB).multiplyScalar(uvC.y).addScaledVector(vC, -uvB.y).multiplyScalar(r);
            tdir.copy(vC).multiplyScalar(uvB.x).addScaledVector(vB, -uvC.x).multiplyScalar(r);
            tan1[a].add(sdir);
            tan1[b].add(sdir);
            tan1[c].add(sdir);
            tan2[a].add(tdir);
            tan2[b].add(tdir);
            tan2[c].add(tdir);
        }
        let groups = this.groups;
        if (groups.length === 0) {
            groups = [
                {
                    start: 0,
                    count: indices.length
                }
            ];
        }
        for(let i1 = 0, il = groups.length; i1 < il; ++i1){
            const group = groups[i1];
            const start = group.start;
            const count = group.count;
            for(let j = start, jl = start + count; j < jl; j += 3){
                handleTriangle(indices[j + 0], indices[j + 1], indices[j + 2]);
            }
        }
        const tmp = new Vector3(), tmp2 = new Vector3();
        const n = new Vector3(), n2 = new Vector3();
        function handleVertex(v) {
            n.fromArray(normals, v * 3);
            n2.copy(n);
            const t = tan1[v];
            tmp.copy(t);
            tmp.sub(n.multiplyScalar(n.dot(t))).normalize();
            tmp2.crossVectors(n2, t);
            const test = tmp2.dot(tan2[v]);
            const w = test < 0.0 ? -1.0 : 1.0;
            tangents[v * 4] = tmp.x;
            tangents[v * 4 + 1] = tmp.y;
            tangents[v * 4 + 2] = tmp.z;
            tangents[v * 4 + 3] = w;
        }
        for(let i2 = 0, il1 = groups.length; i2 < il1; ++i2){
            const group1 = groups[i2];
            const start1 = group1.start;
            const count1 = group1.count;
            for(let j1 = start1, jl1 = start1 + count1; j1 < jl1; j1 += 3){
                handleVertex(indices[j1 + 0]);
                handleVertex(indices[j1 + 1]);
                handleVertex(indices[j1 + 2]);
            }
        }
    }
    computeVertexNormals() {
        const index = this.index;
        const positionAttribute = this.getAttribute('position');
        if (positionAttribute !== undefined) {
            let normalAttribute = this.getAttribute('normal');
            if (normalAttribute === undefined) {
                normalAttribute = new BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
                this.setAttribute('normal', normalAttribute);
            } else {
                for(let i = 0, il = normalAttribute.count; i < il; i++){
                    normalAttribute.setXYZ(i, 0, 0, 0);
                }
            }
            const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
            const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
            const cb = new Vector3(), ab = new Vector3();
            if (index) {
                for(let i1 = 0, il1 = index.count; i1 < il1; i1 += 3){
                    const vA = index.getX(i1 + 0);
                    const vB = index.getX(i1 + 1);
                    const vC = index.getX(i1 + 2);
                    pA.fromBufferAttribute(positionAttribute, vA);
                    pB.fromBufferAttribute(positionAttribute, vB);
                    pC.fromBufferAttribute(positionAttribute, vC);
                    cb.subVectors(pC, pB);
                    ab.subVectors(pA, pB);
                    cb.cross(ab);
                    nA.fromBufferAttribute(normalAttribute, vA);
                    nB.fromBufferAttribute(normalAttribute, vB);
                    nC.fromBufferAttribute(normalAttribute, vC);
                    nA.add(cb);
                    nB.add(cb);
                    nC.add(cb);
                    normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
                    normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
                    normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
                }
            } else {
                for(let i2 = 0, il2 = positionAttribute.count; i2 < il2; i2 += 3){
                    pA.fromBufferAttribute(positionAttribute, i2 + 0);
                    pB.fromBufferAttribute(positionAttribute, i2 + 1);
                    pC.fromBufferAttribute(positionAttribute, i2 + 2);
                    cb.subVectors(pC, pB);
                    ab.subVectors(pA, pB);
                    cb.cross(ab);
                    normalAttribute.setXYZ(i2 + 0, cb.x, cb.y, cb.z);
                    normalAttribute.setXYZ(i2 + 1, cb.x, cb.y, cb.z);
                    normalAttribute.setXYZ(i2 + 2, cb.x, cb.y, cb.z);
                }
            }
            this.normalizeNormals();
            normalAttribute.needsUpdate = true;
        }
    }
    merge() {
        console.error('THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead.');
        return this;
    }
    normalizeNormals() {
        const normals = this.attributes.normal;
        for(let i = 0, il = normals.count; i < il; i++){
            _vector$7.fromBufferAttribute(normals, i);
            _vector$7.normalize();
            normals.setXYZ(i, _vector$7.x, _vector$7.y, _vector$7.z);
        }
    }
    toNonIndexed() {
        function convertBufferAttribute(attribute, indices) {
            const array = attribute.array;
            const itemSize = attribute.itemSize;
            const normalized = attribute.normalized;
            const array2 = new array.constructor(indices.length * itemSize);
            let index = 0, index2 = 0;
            for(let i = 0, l = indices.length; i < l; i++){
                if (attribute.isInterleavedBufferAttribute) {
                    index = indices[i] * attribute.data.stride + attribute.offset;
                } else {
                    index = indices[i] * itemSize;
                }
                for(let j = 0; j < itemSize; j++){
                    array2[index2++] = array[index++];
                }
            }
            return new BufferAttribute(array2, itemSize, normalized);
        }
        if (this.index === null) {
            console.warn('THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.');
            return this;
        }
        const geometry2 = new BufferGeometry();
        const indices = this.index.array;
        const attributes = this.attributes;
        for(const name in attributes){
            const attribute = attributes[name];
            const newAttribute = convertBufferAttribute(attribute, indices);
            geometry2.setAttribute(name, newAttribute);
        }
        const morphAttributes = this.morphAttributes;
        for(const name1 in morphAttributes){
            const morphArray = [];
            const morphAttribute = morphAttributes[name1];
            for(let i = 0, il = morphAttribute.length; i < il; i++){
                const attribute1 = morphAttribute[i];
                const newAttribute1 = convertBufferAttribute(attribute1, indices);
                morphArray.push(newAttribute1);
            }
            geometry2.morphAttributes[name1] = morphArray;
        }
        geometry2.morphTargetsRelative = this.morphTargetsRelative;
        const groups = this.groups;
        for(let i1 = 0, l = groups.length; i1 < l; i1++){
            const group = groups[i1];
            geometry2.addGroup(group.start, group.count, group.materialIndex);
        }
        return geometry2;
    }
    toJSON() {
        const data = {
            metadata: {
                version: 4.5,
                type: 'BufferGeometry',
                generator: 'BufferGeometry.toJSON'
            }
        };
        data.uuid = this.uuid;
        data.type = this.type;
        if (this.name !== '') data.name = this.name;
        if (Object.keys(this.userData).length > 0) data.userData = this.userData;
        if (this.parameters !== undefined) {
            const parameters = this.parameters;
            for(const key in parameters){
                if (parameters[key] !== undefined) data[key] = parameters[key];
            }
            return data;
        }
        data.data = {
            attributes: {}
        };
        const index = this.index;
        if (index !== null) {
            data.data.index = {
                type: index.array.constructor.name,
                array: Array.prototype.slice.call(index.array)
            };
        }
        const attributes = this.attributes;
        for(const key1 in attributes){
            const attribute = attributes[key1];
            data.data.attributes[key1] = attribute.toJSON(data.data);
        }
        const morphAttributes = {};
        let hasMorphAttributes = false;
        for(const key2 in this.morphAttributes){
            const attributeArray = this.morphAttributes[key2];
            const array = [];
            for(let i = 0, il = attributeArray.length; i < il; i++){
                const attribute1 = attributeArray[i];
                array.push(attribute1.toJSON(data.data));
            }
            if (array.length > 0) {
                morphAttributes[key2] = array;
                hasMorphAttributes = true;
            }
        }
        if (hasMorphAttributes) {
            data.data.morphAttributes = morphAttributes;
            data.data.morphTargetsRelative = this.morphTargetsRelative;
        }
        const groups = this.groups;
        if (groups.length > 0) {
            data.data.groups = JSON.parse(JSON.stringify(groups));
        }
        const boundingSphere = this.boundingSphere;
        if (boundingSphere !== null) {
            data.data.boundingSphere = {
                center: boundingSphere.center.toArray(),
                radius: boundingSphere.radius
            };
        }
        return data;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        const data = {};
        this.name = source.name;
        const index = source.index;
        if (index !== null) {
            this.setIndex(index.clone(data));
        }
        const attributes = source.attributes;
        for(const name in attributes){
            const attribute = attributes[name];
            this.setAttribute(name, attribute.clone(data));
        }
        const morphAttributes = source.morphAttributes;
        for(const name1 in morphAttributes){
            const array = [];
            const morphAttribute = morphAttributes[name1];
            for(let i = 0, l = morphAttribute.length; i < l; i++){
                array.push(morphAttribute[i].clone(data));
            }
            this.morphAttributes[name1] = array;
        }
        this.morphTargetsRelative = source.morphTargetsRelative;
        const groups = source.groups;
        for(let i1 = 0, l1 = groups.length; i1 < l1; i1++){
            const group = groups[i1];
            this.addGroup(group.start, group.count, group.materialIndex);
        }
        const boundingBox = source.boundingBox;
        if (boundingBox !== null) {
            this.boundingBox = boundingBox.clone();
        }
        const boundingSphere = source.boundingSphere;
        if (boundingSphere !== null) {
            this.boundingSphere = boundingSphere.clone();
        }
        this.drawRange.start = source.drawRange.start;
        this.drawRange.count = source.drawRange.count;
        this.userData = source.userData;
        return this;
    }
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
    }
}
const _inverseMatrix$2 = new Matrix4();
const _ray$2 = new Ray();
const _sphere$4 = new Sphere();
const _sphereHitAt = new Vector3();
const _vA$1 = new Vector3();
const _vB$1 = new Vector3();
const _vC$1 = new Vector3();
const _tempA = new Vector3();
const _morphA = new Vector3();
const _uvA$1 = new Vector2();
const _uvB$1 = new Vector2();
const _uvC$1 = new Vector2();
const _normalA = new Vector3();
const _normalB = new Vector3();
const _normalC = new Vector3();
const _intersectionPoint = new Vector3();
const _intersectionPointWorld = new Vector3();
class Mesh extends Object3D {
    constructor(geometry = new BufferGeometry(), material = new MeshBasicMaterial()){
        super();
        this.isMesh = true;
        this.type = 'Mesh';
        this.geometry = geometry;
        this.material = material;
        this.updateMorphTargets();
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        if (source.morphTargetInfluences !== undefined) {
            this.morphTargetInfluences = source.morphTargetInfluences.slice();
        }
        if (source.morphTargetDictionary !== undefined) {
            this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
        }
        this.material = source.material;
        this.geometry = source.geometry;
        return this;
    }
    updateMorphTargets() {
        const geometry = this.geometry;
        const morphAttributes = geometry.morphAttributes;
        const keys = Object.keys(morphAttributes);
        if (keys.length > 0) {
            const morphAttribute = morphAttributes[keys[0]];
            if (morphAttribute !== undefined) {
                this.morphTargetInfluences = [];
                this.morphTargetDictionary = {};
                for(let m = 0, ml = morphAttribute.length; m < ml; m++){
                    const name = morphAttribute[m].name || String(m);
                    this.morphTargetInfluences.push(0);
                    this.morphTargetDictionary[name] = m;
                }
            }
        }
    }
    getVertexPosition(index, target) {
        const geometry = this.geometry;
        const position = geometry.attributes.position;
        const morphPosition = geometry.morphAttributes.position;
        const morphTargetsRelative = geometry.morphTargetsRelative;
        target.fromBufferAttribute(position, index);
        const morphInfluences = this.morphTargetInfluences;
        if (morphPosition && morphInfluences) {
            _morphA.set(0, 0, 0);
            for(let i = 0, il = morphPosition.length; i < il; i++){
                const influence = morphInfluences[i];
                const morphAttribute = morphPosition[i];
                if (influence === 0) continue;
                _tempA.fromBufferAttribute(morphAttribute, index);
                if (morphTargetsRelative) {
                    _morphA.addScaledVector(_tempA, influence);
                } else {
                    _morphA.addScaledVector(_tempA.sub(target), influence);
                }
            }
            target.add(_morphA);
        }
        if (this.isSkinnedMesh) {
            this.applyBoneTransform(index, target);
        }
        return target;
    }
    raycast(raycaster, intersects) {
        const geometry = this.geometry;
        const material = this.material;
        const matrixWorld = this.matrixWorld;
        if (material === undefined) return;
        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
        _sphere$4.copy(geometry.boundingSphere);
        _sphere$4.applyMatrix4(matrixWorld);
        _ray$2.copy(raycaster.ray).recast(raycaster.near);
        if (_sphere$4.containsPoint(_ray$2.origin) === false) {
            if (_ray$2.intersectSphere(_sphere$4, _sphereHitAt) === null) return;
            if (_ray$2.origin.distanceToSquared(_sphereHitAt) > (raycaster.far - raycaster.near) ** 2) return;
        }
        _inverseMatrix$2.copy(matrixWorld).invert();
        _ray$2.copy(raycaster.ray).applyMatrix4(_inverseMatrix$2);
        if (geometry.boundingBox !== null) {
            if (_ray$2.intersectsBox(geometry.boundingBox) === false) return;
        }
        let intersection;
        const index = geometry.index;
        const position = geometry.attributes.position;
        const uv = geometry.attributes.uv;
        const uv2 = geometry.attributes.uv2;
        const normal = geometry.attributes.normal;
        const groups = geometry.groups;
        const drawRange = geometry.drawRange;
        if (index !== null) {
            if (Array.isArray(material)) {
                for(let i = 0, il = groups.length; i < il; i++){
                    const group = groups[i];
                    const groupMaterial = material[group.materialIndex];
                    const start = Math.max(group.start, drawRange.start);
                    const end = Math.min(index.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));
                    for(let j = start, jl = end; j < jl; j += 3){
                        const a = index.getX(j);
                        const b = index.getX(j + 1);
                        const c = index.getX(j + 2);
                        intersection = checkGeometryIntersection(this, groupMaterial, raycaster, _ray$2, uv, uv2, normal, a, b, c);
                        if (intersection) {
                            intersection.faceIndex = Math.floor(j / 3);
                            intersection.face.materialIndex = group.materialIndex;
                            intersects.push(intersection);
                        }
                    }
                }
            } else {
                const start1 = Math.max(0, drawRange.start);
                const end1 = Math.min(index.count, drawRange.start + drawRange.count);
                for(let i1 = start1, il1 = end1; i1 < il1; i1 += 3){
                    const a1 = index.getX(i1);
                    const b1 = index.getX(i1 + 1);
                    const c1 = index.getX(i1 + 2);
                    intersection = checkGeometryIntersection(this, material, raycaster, _ray$2, uv, uv2, normal, a1, b1, c1);
                    if (intersection) {
                        intersection.faceIndex = Math.floor(i1 / 3);
                        intersects.push(intersection);
                    }
                }
            }
        } else if (position !== undefined) {
            if (Array.isArray(material)) {
                for(let i2 = 0, il2 = groups.length; i2 < il2; i2++){
                    const group1 = groups[i2];
                    const groupMaterial1 = material[group1.materialIndex];
                    const start2 = Math.max(group1.start, drawRange.start);
                    const end2 = Math.min(position.count, Math.min(group1.start + group1.count, drawRange.start + drawRange.count));
                    for(let j1 = start2, jl1 = end2; j1 < jl1; j1 += 3){
                        const a2 = j1;
                        const b2 = j1 + 1;
                        const c2 = j1 + 2;
                        intersection = checkGeometryIntersection(this, groupMaterial1, raycaster, _ray$2, uv, uv2, normal, a2, b2, c2);
                        if (intersection) {
                            intersection.faceIndex = Math.floor(j1 / 3);
                            intersection.face.materialIndex = group1.materialIndex;
                            intersects.push(intersection);
                        }
                    }
                }
            } else {
                const start3 = Math.max(0, drawRange.start);
                const end3 = Math.min(position.count, drawRange.start + drawRange.count);
                for(let i3 = start3, il3 = end3; i3 < il3; i3 += 3){
                    const a3 = i3;
                    const b3 = i3 + 1;
                    const c3 = i3 + 2;
                    intersection = checkGeometryIntersection(this, material, raycaster, _ray$2, uv, uv2, normal, a3, b3, c3);
                    if (intersection) {
                        intersection.faceIndex = Math.floor(i3 / 3);
                        intersects.push(intersection);
                    }
                }
            }
        }
    }
}
function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
    let intersect;
    if (material.side === 1) {
        intersect = ray.intersectTriangle(pC, pB, pA, true, point);
    } else {
        intersect = ray.intersectTriangle(pA, pB, pC, material.side === FrontSide, point);
    }
    if (intersect === null) return null;
    _intersectionPointWorld.copy(point);
    _intersectionPointWorld.applyMatrix4(object.matrixWorld);
    const distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);
    if (distance < raycaster.near || distance > raycaster.far) return null;
    return {
        distance: distance,
        point: _intersectionPointWorld.clone(),
        object: object
    };
}
function checkGeometryIntersection(object, material, raycaster, ray, uv, uv2, normal, a, b, c) {
    object.getVertexPosition(a, _vA$1);
    object.getVertexPosition(b, _vB$1);
    object.getVertexPosition(c, _vC$1);
    const intersection = checkIntersection(object, material, raycaster, ray, _vA$1, _vB$1, _vC$1, _intersectionPoint);
    if (intersection) {
        if (uv) {
            _uvA$1.fromBufferAttribute(uv, a);
            _uvB$1.fromBufferAttribute(uv, b);
            _uvC$1.fromBufferAttribute(uv, c);
            intersection.uv = Triangle.getInterpolation(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2());
        }
        if (uv2) {
            _uvA$1.fromBufferAttribute(uv2, a);
            _uvB$1.fromBufferAttribute(uv2, b);
            _uvC$1.fromBufferAttribute(uv2, c);
            intersection.uv2 = Triangle.getInterpolation(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2());
        }
        if (normal) {
            _normalA.fromBufferAttribute(normal, a);
            _normalB.fromBufferAttribute(normal, b);
            _normalC.fromBufferAttribute(normal, c);
            intersection.normal = Triangle.getInterpolation(_intersectionPoint, _vA$1, _vB$1, _vC$1, _normalA, _normalB, _normalC, new Vector3());
            if (intersection.normal.dot(ray.direction) > 0) {
                intersection.normal.multiplyScalar(-1);
            }
        }
        const face = {
            a: a,
            b: b,
            c: c,
            normal: new Vector3(),
            materialIndex: 0
        };
        Triangle.getNormal(_vA$1, _vB$1, _vC$1, face.normal);
        intersection.face = face;
    }
    return intersection;
}
class BoxGeometry extends BufferGeometry {
    constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1){
        super();
        this.type = 'BoxGeometry';
        this.parameters = {
            width: width,
            height: height,
            depth: depth,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            depthSegments: depthSegments
        };
        const scope = this;
        widthSegments = Math.floor(widthSegments);
        heightSegments = Math.floor(heightSegments);
        depthSegments = Math.floor(depthSegments);
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        let numberOfVertices = 0;
        let groupStart = 0;
        buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0);
        buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1);
        buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2);
        buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3);
        buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4);
        buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5);
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
            const segmentWidth = width / gridX;
            const segmentHeight = height / gridY;
            const widthHalf = width / 2;
            const heightHalf = height / 2;
            const depthHalf = depth / 2;
            const gridX1 = gridX + 1;
            const gridY1 = gridY + 1;
            let vertexCounter = 0;
            let groupCount = 0;
            const vector = new Vector3();
            for(let iy = 0; iy < gridY1; iy++){
                const y = iy * segmentHeight - heightHalf;
                for(let ix = 0; ix < gridX1; ix++){
                    const x = ix * segmentWidth - widthHalf;
                    vector[u] = x * udir;
                    vector[v] = y * vdir;
                    vector[w] = depthHalf;
                    vertices.push(vector.x, vector.y, vector.z);
                    vector[u] = 0;
                    vector[v] = 0;
                    vector[w] = depth > 0 ? 1 : -1;
                    normals.push(vector.x, vector.y, vector.z);
                    uvs.push(ix / gridX);
                    uvs.push(1 - iy / gridY);
                    vertexCounter += 1;
                }
            }
            for(let iy1 = 0; iy1 < gridY; iy1++){
                for(let ix1 = 0; ix1 < gridX; ix1++){
                    const a = numberOfVertices + ix1 + gridX1 * iy1;
                    const b = numberOfVertices + ix1 + gridX1 * (iy1 + 1);
                    const c = numberOfVertices + (ix1 + 1) + gridX1 * (iy1 + 1);
                    const d = numberOfVertices + (ix1 + 1) + gridX1 * iy1;
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                    groupCount += 6;
                }
            }
            scope.addGroup(groupStart, groupCount, materialIndex);
            groupStart += groupCount;
            numberOfVertices += vertexCounter;
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new BoxGeometry(data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
    }
}
function cloneUniforms(src) {
    const dst = {};
    for(const u in src){
        dst[u] = {};
        for(const p in src[u]){
            const property = src[u][p];
            if (property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion)) {
                if (property.isRenderTargetTexture) {
                    console.warn('UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().');
                    dst[u][p] = null;
                } else {
                    dst[u][p] = property.clone();
                }
            } else if (Array.isArray(property)) {
                dst[u][p] = property.slice();
            } else {
                dst[u][p] = property;
            }
        }
    }
    return dst;
}
function mergeUniforms(uniforms) {
    const merged = {};
    for(let u = 0; u < uniforms.length; u++){
        const tmp = cloneUniforms(uniforms[u]);
        for(const p in tmp){
            merged[p] = tmp[p];
        }
    }
    return merged;
}
function cloneUniformsGroups(src) {
    const dst = [];
    for(let u = 0; u < src.length; u++){
        dst.push(src[u].clone());
    }
    return dst;
}
function getUnlitUniformColorSpace(renderer) {
    if (renderer.getRenderTarget() === null) {
        return renderer.outputEncoding === 3001 ? SRGBColorSpace : LinearSRGBColorSpace;
    }
    return LinearSRGBColorSpace;
}
const UniformsUtils = {
    clone: cloneUniforms,
    merge: mergeUniforms
};
var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
class ShaderMaterial extends Material {
    constructor(parameters){
        super();
        this.isShaderMaterial = true;
        this.type = 'ShaderMaterial';
        this.defines = {};
        this.uniforms = {};
        this.uniformsGroups = [];
        this.vertexShader = default_vertex;
        this.fragmentShader = default_fragment;
        this.linewidth = 1;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.fog = false;
        this.lights = false;
        this.clipping = false;
        this.forceSinglePass = true;
        this.extensions = {
            derivatives: false,
            fragDepth: false,
            drawBuffers: false,
            shaderTextureLOD: false
        };
        this.defaultAttributeValues = {
            'color': [
                1,
                1,
                1
            ],
            'uv': [
                0,
                0
            ],
            'uv2': [
                0,
                0
            ]
        };
        this.index0AttributeName = undefined;
        this.uniformsNeedUpdate = false;
        this.glslVersion = null;
        if (parameters !== undefined) {
            this.setValues(parameters);
        }
    }
    copy(source) {
        super.copy(source);
        this.fragmentShader = source.fragmentShader;
        this.vertexShader = source.vertexShader;
        this.uniforms = cloneUniforms(source.uniforms);
        this.uniformsGroups = cloneUniformsGroups(source.uniformsGroups);
        this.defines = Object.assign({}, source.defines);
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.fog = source.fog;
        this.lights = source.lights;
        this.clipping = source.clipping;
        this.extensions = Object.assign({}, source.extensions);
        this.glslVersion = source.glslVersion;
        return this;
    }
    toJSON(meta) {
        const data = super.toJSON(meta);
        data.glslVersion = this.glslVersion;
        data.uniforms = {};
        for(const name in this.uniforms){
            const uniform = this.uniforms[name];
            const value = uniform.value;
            if (value && value.isTexture) {
                data.uniforms[name] = {
                    type: 't',
                    value: value.toJSON(meta).uuid
                };
            } else if (value && value.isColor) {
                data.uniforms[name] = {
                    type: 'c',
                    value: value.getHex()
                };
            } else if (value && value.isVector2) {
                data.uniforms[name] = {
                    type: 'v2',
                    value: value.toArray()
                };
            } else if (value && value.isVector3) {
                data.uniforms[name] = {
                    type: 'v3',
                    value: value.toArray()
                };
            } else if (value && value.isVector4) {
                data.uniforms[name] = {
                    type: 'v4',
                    value: value.toArray()
                };
            } else if (value && value.isMatrix3) {
                data.uniforms[name] = {
                    type: 'm3',
                    value: value.toArray()
                };
            } else if (value && value.isMatrix4) {
                data.uniforms[name] = {
                    type: 'm4',
                    value: value.toArray()
                };
            } else {
                data.uniforms[name] = {
                    value: value
                };
            }
        }
        if (Object.keys(this.defines).length > 0) data.defines = this.defines;
        data.vertexShader = this.vertexShader;
        data.fragmentShader = this.fragmentShader;
        const extensions = {};
        for(const key in this.extensions){
            if (this.extensions[key] === true) extensions[key] = true;
        }
        if (Object.keys(extensions).length > 0) data.extensions = extensions;
        return data;
    }
}
class Camera extends Object3D {
    constructor(){
        super();
        this.isCamera = true;
        this.type = 'Camera';
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.projectionMatrixInverse = new Matrix4();
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
        return this;
    }
    getWorldDirection(target) {
        this.updateWorldMatrix(true, false);
        const e = this.matrixWorld.elements;
        return target.set(-e[8], -e[9], -e[10]).normalize();
    }
    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);
        this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(updateParents, updateChildren) {
        super.updateWorldMatrix(updateParents, updateChildren);
        this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
class PerspectiveCamera extends Camera {
    constructor(fov = 50, aspect = 1, near = 0.1, far = 2000){
        super();
        this.isPerspectiveCamera = true;
        this.type = 'PerspectiveCamera';
        this.fov = fov;
        this.zoom = 1;
        this.near = near;
        this.far = far;
        this.focus = 10;
        this.aspect = aspect;
        this.view = null;
        this.filmGauge = 35;
        this.filmOffset = 0;
        this.updateProjectionMatrix();
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.fov = source.fov;
        this.zoom = source.zoom;
        this.near = source.near;
        this.far = source.far;
        this.focus = source.focus;
        this.aspect = source.aspect;
        this.view = source.view === null ? null : Object.assign({}, source.view);
        this.filmGauge = source.filmGauge;
        this.filmOffset = source.filmOffset;
        return this;
    }
    setFocalLength(focalLength) {
        const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
        this.fov = RAD2DEG * 2 * Math.atan(vExtentSlope);
        this.updateProjectionMatrix();
    }
    getFocalLength() {
        const vExtentSlope = Math.tan(DEG2RAD * 0.5 * this.fov);
        return 0.5 * this.getFilmHeight() / vExtentSlope;
    }
    getEffectiveFOV() {
        return RAD2DEG * 2 * Math.atan(Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom);
    }
    getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1);
    }
    setViewOffset(fullWidth, fullHeight, x, y, width, height) {
        this.aspect = fullWidth / fullHeight;
        if (this.view === null) {
            this.view = {
                enabled: true,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            };
        }
        this.view.enabled = true;
        this.view.fullWidth = fullWidth;
        this.view.fullHeight = fullHeight;
        this.view.offsetX = x;
        this.view.offsetY = y;
        this.view.width = width;
        this.view.height = height;
        this.updateProjectionMatrix();
    }
    clearViewOffset() {
        if (this.view !== null) {
            this.view.enabled = false;
        }
        this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
        const near = this.near;
        let top = near * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
        let height = 2 * top;
        let width = this.aspect * height;
        let left = -0.5 * width;
        const view = this.view;
        if (this.view !== null && this.view.enabled) {
            const fullWidth = view.fullWidth, fullHeight = view.fullHeight;
            left += view.offsetX * width / fullWidth;
            top -= view.offsetY * height / fullHeight;
            width *= view.width / fullWidth;
            height *= view.height / fullHeight;
        }
        const skew = this.filmOffset;
        if (skew !== 0) left += near * skew / this.getFilmWidth();
        this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(meta) {
        const data = super.toJSON(meta);
        data.object.fov = this.fov;
        data.object.zoom = this.zoom;
        data.object.near = this.near;
        data.object.far = this.far;
        data.object.focus = this.focus;
        data.object.aspect = this.aspect;
        if (this.view !== null) data.object.view = Object.assign({}, this.view);
        data.object.filmGauge = this.filmGauge;
        data.object.filmOffset = this.filmOffset;
        return data;
    }
}
const fov = -90;
class CubeCamera extends Object3D {
    constructor(near, far, renderTarget){
        super();
        this.type = 'CubeCamera';
        this.renderTarget = renderTarget;
        const cameraPX = new PerspectiveCamera(fov, 1, near, far);
        cameraPX.layers = this.layers;
        cameraPX.up.set(0, 1, 0);
        cameraPX.lookAt(1, 0, 0);
        this.add(cameraPX);
        const cameraNX = new PerspectiveCamera(fov, 1, near, far);
        cameraNX.layers = this.layers;
        cameraNX.up.set(0, 1, 0);
        cameraNX.lookAt(-1, 0, 0);
        this.add(cameraNX);
        const cameraPY = new PerspectiveCamera(fov, 1, near, far);
        cameraPY.layers = this.layers;
        cameraPY.up.set(0, 0, -1);
        cameraPY.lookAt(0, 1, 0);
        this.add(cameraPY);
        const cameraNY = new PerspectiveCamera(fov, 1, near, far);
        cameraNY.layers = this.layers;
        cameraNY.up.set(0, 0, 1);
        cameraNY.lookAt(0, -1, 0);
        this.add(cameraNY);
        const cameraPZ = new PerspectiveCamera(fov, 1, near, far);
        cameraPZ.layers = this.layers;
        cameraPZ.up.set(0, 1, 0);
        cameraPZ.lookAt(0, 0, 1);
        this.add(cameraPZ);
        const cameraNZ = new PerspectiveCamera(fov, 1, near, far);
        cameraNZ.layers = this.layers;
        cameraNZ.up.set(0, 1, 0);
        cameraNZ.lookAt(0, 0, -1);
        this.add(cameraNZ);
    }
    update(renderer, scene) {
        if (this.parent === null) this.updateMatrixWorld();
        const renderTarget = this.renderTarget;
        const [cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ] = this.children;
        const currentRenderTarget = renderer.getRenderTarget();
        const currentToneMapping = renderer.toneMapping;
        const currentXrEnabled = renderer.xr.enabled;
        renderer.toneMapping = NoToneMapping;
        renderer.xr.enabled = false;
        const generateMipmaps = renderTarget.texture.generateMipmaps;
        renderTarget.texture.generateMipmaps = false;
        renderer.setRenderTarget(renderTarget, 0);
        renderer.render(scene, cameraPX);
        renderer.setRenderTarget(renderTarget, 1);
        renderer.render(scene, cameraNX);
        renderer.setRenderTarget(renderTarget, 2);
        renderer.render(scene, cameraPY);
        renderer.setRenderTarget(renderTarget, 3);
        renderer.render(scene, cameraNY);
        renderer.setRenderTarget(renderTarget, 4);
        renderer.render(scene, cameraPZ);
        renderTarget.texture.generateMipmaps = generateMipmaps;
        renderer.setRenderTarget(renderTarget, 5);
        renderer.render(scene, cameraNZ);
        renderer.setRenderTarget(currentRenderTarget);
        renderer.toneMapping = currentToneMapping;
        renderer.xr.enabled = currentXrEnabled;
        renderTarget.texture.needsPMREMUpdate = true;
    }
}
class CubeTexture extends Texture {
    constructor(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding){
        images = images !== undefined ? images : [];
        mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
        super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
        this.isCubeTexture = true;
        this.flipY = false;
    }
    get images() {
        return this.image;
    }
    set images(value) {
        this.image = value;
    }
}
class WebGLCubeRenderTarget extends WebGLRenderTarget {
    constructor(size = 1, options = {}){
        super(size, size, options);
        this.isWebGLCubeRenderTarget = true;
        const image = {
            width: size,
            height: size,
            depth: 1
        };
        const images = [
            image,
            image,
            image,
            image,
            image,
            image
        ];
        this.texture = new CubeTexture(images, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
        this.texture.isRenderTargetTexture = true;
        this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
        this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;
    }
    fromEquirectangularTexture(renderer, texture) {
        this.texture.type = texture.type;
        this.texture.encoding = texture.encoding;
        this.texture.generateMipmaps = texture.generateMipmaps;
        this.texture.minFilter = texture.minFilter;
        this.texture.magFilter = texture.magFilter;
        const shader = {
            uniforms: {
                tEquirect: {
                    value: null
                }
            },
            vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
            fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
        };
        const geometry = new BoxGeometry(5, 5, 5);
        const material = new ShaderMaterial({
            name: 'CubemapFromEquirect',
            uniforms: cloneUniforms(shader.uniforms),
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            side: 1,
            blending: 0
        });
        material.uniforms.tEquirect.value = texture;
        const mesh = new Mesh(geometry, material);
        const currentMinFilter = texture.minFilter;
        if (texture.minFilter === 1008) texture.minFilter = LinearFilter;
        const camera = new CubeCamera(1, 10, this);
        camera.update(renderer, mesh);
        texture.minFilter = currentMinFilter;
        mesh.geometry.dispose();
        mesh.material.dispose();
        return this;
    }
    clear(renderer, color, depth, stencil) {
        const currentRenderTarget = renderer.getRenderTarget();
        for(let i = 0; i < 6; i++){
            renderer.setRenderTarget(this, i);
            renderer.clear(color, depth, stencil);
        }
        renderer.setRenderTarget(currentRenderTarget);
    }
}
const _vector1 = new Vector3();
const _vector2 = new Vector3();
const _normalMatrix = new Matrix3();
class Plane {
    constructor(normal = new Vector3(1, 0, 0), constant = 0){
        this.isPlane = true;
        this.normal = normal;
        this.constant = constant;
    }
    set(normal, constant) {
        this.normal.copy(normal);
        this.constant = constant;
        return this;
    }
    setComponents(x, y, z, w) {
        this.normal.set(x, y, z);
        this.constant = w;
        return this;
    }
    setFromNormalAndCoplanarPoint(normal, point) {
        this.normal.copy(normal);
        this.constant = -point.dot(this.normal);
        return this;
    }
    setFromCoplanarPoints(a, b, c) {
        const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();
        this.setFromNormalAndCoplanarPoint(normal, a);
        return this;
    }
    copy(plane) {
        this.normal.copy(plane.normal);
        this.constant = plane.constant;
        return this;
    }
    normalize() {
        const inverseNormalLength = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;
    }
    negate() {
        this.constant *= -1;
        this.normal.negate();
        return this;
    }
    distanceToPoint(point) {
        return this.normal.dot(point) + this.constant;
    }
    distanceToSphere(sphere) {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }
    projectPoint(point, target) {
        return target.copy(point).addScaledVector(this.normal, -this.distanceToPoint(point));
    }
    intersectLine(line, target) {
        const direction = line.delta(_vector1);
        const denominator = this.normal.dot(direction);
        if (denominator === 0) {
            if (this.distanceToPoint(line.start) === 0) {
                return target.copy(line.start);
            }
            return null;
        }
        const t = -(line.start.dot(this.normal) + this.constant) / denominator;
        if (t < 0 || t > 1) {
            return null;
        }
        return target.copy(line.start).addScaledVector(direction, t);
    }
    intersectsLine(line) {
        const startSign = this.distanceToPoint(line.start);
        const endSign = this.distanceToPoint(line.end);
        return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
    }
    intersectsBox(box) {
        return box.intersectsPlane(this);
    }
    intersectsSphere(sphere) {
        return sphere.intersectsPlane(this);
    }
    coplanarPoint(target) {
        return target.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(matrix, optionalNormalMatrix) {
        const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
        const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
        const normal = this.normal.applyMatrix3(normalMatrix).normalize();
        this.constant = -referencePoint.dot(normal);
        return this;
    }
    translate(offset) {
        this.constant -= offset.dot(this.normal);
        return this;
    }
    equals(plane) {
        return plane.normal.equals(this.normal) && plane.constant === this.constant;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
const _sphere$3 = new Sphere();
const _vector$6 = new Vector3();
class Frustum {
    constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()){
        this.planes = [
            p0,
            p1,
            p2,
            p3,
            p4,
            p5
        ];
    }
    set(p0, p1, p2, p3, p4, p5) {
        const planes = this.planes;
        planes[0].copy(p0);
        planes[1].copy(p1);
        planes[2].copy(p2);
        planes[3].copy(p3);
        planes[4].copy(p4);
        planes[5].copy(p5);
        return this;
    }
    copy(frustum) {
        const planes = this.planes;
        for(let i = 0; i < 6; i++){
            planes[i].copy(frustum.planes[i]);
        }
        return this;
    }
    setFromProjectionMatrix(m) {
        const planes = this.planes;
        const me = m.elements;
        const me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
        const me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
        const me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
        const me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
        planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
        planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
        planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
        planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
        planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
        planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
        return this;
    }
    intersectsObject(object) {
        if (object.boundingSphere !== undefined) {
            if (object.boundingSphere === null) object.computeBoundingSphere();
            _sphere$3.copy(object.boundingSphere).applyMatrix4(object.matrixWorld);
        } else {
            const geometry = object.geometry;
            if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
            _sphere$3.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
        }
        return this.intersectsSphere(_sphere$3);
    }
    intersectsSprite(sprite) {
        _sphere$3.center.set(0, 0, 0);
        _sphere$3.radius = 0.7071067811865476;
        _sphere$3.applyMatrix4(sprite.matrixWorld);
        return this.intersectsSphere(_sphere$3);
    }
    intersectsSphere(sphere) {
        const planes = this.planes;
        const center = sphere.center;
        const negRadius = -sphere.radius;
        for(let i = 0; i < 6; i++){
            const distance = planes[i].distanceToPoint(center);
            if (distance < negRadius) {
                return false;
            }
        }
        return true;
    }
    intersectsBox(box) {
        const planes = this.planes;
        for(let i = 0; i < 6; i++){
            const plane = planes[i];
            _vector$6.x = plane.normal.x > 0 ? box.max.x : box.min.x;
            _vector$6.y = plane.normal.y > 0 ? box.max.y : box.min.y;
            _vector$6.z = plane.normal.z > 0 ? box.max.z : box.min.z;
            if (plane.distanceToPoint(_vector$6) < 0) {
                return false;
            }
        }
        return true;
    }
    containsPoint(point) {
        const planes = this.planes;
        for(let i = 0; i < 6; i++){
            if (planes[i].distanceToPoint(point) < 0) {
                return false;
            }
        }
        return true;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
function WebGLAnimation() {
    let context = null;
    let isAnimating = false;
    let animationLoop = null;
    let requestId = null;
    function onAnimationFrame(time, frame) {
        animationLoop(time, frame);
        requestId = context.requestAnimationFrame(onAnimationFrame);
    }
    return {
        start: function() {
            if (isAnimating === true) return;
            if (animationLoop === null) return;
            requestId = context.requestAnimationFrame(onAnimationFrame);
            isAnimating = true;
        },
        stop: function() {
            context.cancelAnimationFrame(requestId);
            isAnimating = false;
        },
        setAnimationLoop: function(callback) {
            animationLoop = callback;
        },
        setContext: function(value) {
            context = value;
        }
    };
}
function WebGLAttributes(gl, capabilities) {
    const isWebGL2 = capabilities.isWebGL2;
    const buffers = new WeakMap();
    function createBuffer(attribute, bufferType) {
        const array = attribute.array;
        const usage = attribute.usage;
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, array, usage);
        attribute.onUploadCallback();
        let type;
        if (array instanceof Float32Array) {
            type = 5126;
        } else if (array instanceof Uint16Array) {
            if (attribute.isFloat16BufferAttribute) {
                if (isWebGL2) {
                    type = 5131;
                } else {
                    throw new Error('THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.');
                }
            } else {
                type = 5123;
            }
        } else if (array instanceof Int16Array) {
            type = 5122;
        } else if (array instanceof Uint32Array) {
            type = 5125;
        } else if (array instanceof Int32Array) {
            type = 5124;
        } else if (array instanceof Int8Array) {
            type = 5120;
        } else if (array instanceof Uint8Array) {
            type = 5121;
        } else if (array instanceof Uint8ClampedArray) {
            type = 5121;
        } else {
            throw new Error('THREE.WebGLAttributes: Unsupported buffer data format: ' + array);
        }
        return {
            buffer: buffer,
            type: type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version
        };
    }
    function updateBuffer(buffer, attribute, bufferType) {
        const array = attribute.array;
        const updateRange = attribute.updateRange;
        gl.bindBuffer(bufferType, buffer);
        if (updateRange.count === -1) {
            gl.bufferSubData(bufferType, 0, array);
        } else {
            if (isWebGL2) {
                gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array, updateRange.offset, updateRange.count);
            } else {
                gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
            }
            updateRange.count = -1;
        }
        attribute.onUploadCallback();
    }
    function get(attribute) {
        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
        return buffers.get(attribute);
    }
    function remove(attribute) {
        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
        const data = buffers.get(attribute);
        if (data) {
            gl.deleteBuffer(data.buffer);
            buffers.delete(attribute);
        }
    }
    function update(attribute, bufferType) {
        if (attribute.isGLBufferAttribute) {
            const cached = buffers.get(attribute);
            if (!cached || cached.version < attribute.version) {
                buffers.set(attribute, {
                    buffer: attribute.buffer,
                    type: attribute.type,
                    bytesPerElement: attribute.elementSize,
                    version: attribute.version
                });
            }
            return;
        }
        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
        const data = buffers.get(attribute);
        if (data === undefined) {
            buffers.set(attribute, createBuffer(attribute, bufferType));
        } else if (data.version < attribute.version) {
            updateBuffer(data.buffer, attribute, bufferType);
            data.version = attribute.version;
        }
    }
    return {
        get: get,
        remove: remove,
        update: update
    };
}
class PlaneGeometry extends BufferGeometry {
    constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1){
        super();
        this.type = 'PlaneGeometry';
        this.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments
        };
        const width_half = width / 2;
        const height_half = height / 2;
        const gridX = Math.floor(widthSegments);
        const gridY = Math.floor(heightSegments);
        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;
        const segment_width = width / gridX;
        const segment_height = height / gridY;
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        for(let iy = 0; iy < gridY1; iy++){
            const y = iy * segment_height - height_half;
            for(let ix = 0; ix < gridX1; ix++){
                const x = ix * segment_width - width_half;
                vertices.push(x, -y, 0);
                normals.push(0, 0, 1);
                uvs.push(ix / gridX);
                uvs.push(1 - iy / gridY);
            }
        }
        for(let iy1 = 0; iy1 < gridY; iy1++){
            for(let ix1 = 0; ix1 < gridX; ix1++){
                const a = ix1 + gridX1 * iy1;
                const b = ix1 + gridX1 * (iy1 + 1);
                const c = ix1 + 1 + gridX1 * (iy1 + 1);
                const d = ix1 + 1 + gridX1 * iy1;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments);
    }
}
var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif";
var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";
var alphatest_fragment = "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif";
var alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif";
var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif";
var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";
var begin_vertex = "vec3 transformed = vec3( position );";
var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";
var bsdfs = "float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated";
var iridescence_fragment = "#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\t return vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat R21 = R12;\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif";
var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos.xyz );\n\t\tvec3 vSigmaY = dFdy( surf_pos.xyz );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";
var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";
var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";
var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif";
var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif";
var color_fragment = "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif";
var color_pars_fragment = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif";
var color_pars_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif";
var color_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif";
var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\treturn dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated";
var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_v0 0.339\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_v1 0.276\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_v4 0.046\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_v5 0.016\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_v6 0.0038\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif";
var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";
var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";
var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif";
var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";
var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";
var encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";
var encodings_pars_fragment = "vec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}";
var envmap_fragment = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";
var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif";
var envmap_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";
var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";
var envmap_vertex = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";
var fog_vertex = "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif";
var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif";
var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";
var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";
var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}";
var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif";
var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";
var lights_lambert_fragment = "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;";
var lights_lambert_pars_fragment = "varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert";
var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( LEGACY_LIGHTS )\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#else\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif";
var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP )\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n#endif";
var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";
var lights_toon_pars_fragment = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon";
var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";
var lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong";
var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif";
var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec3 sheenSpecular = vec3( 0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";
var lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometry.viewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif";
var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometry.normal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif";
var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif";
var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";
var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif";
var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";
var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif";
var map_fragment = "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif";
var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";
var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";
var map_particle_pars_fragment = "#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";
var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";
var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";
var morphcolor_vertex = "#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif";
var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif";
var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif";
var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif";
var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_NORMALMAP_TANGENTSPACE\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 geometryNormal = normal;";
var normal_fragment_maps = "#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";
var normal_pars_fragment = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";
var normal_pars_vertex = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";
var normal_vertex = "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif";
var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif";
var clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif";
var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif";
var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif";
var iridescence_pars_fragment = "#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif";
var output_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha + 0.1;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";
var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec2 packDepthToRG( in highp float v ) {\n\treturn packDepthToRGBA( v ).yx;\n}\nfloat unpackRGToDepth( const in highp vec2 v ) {\n\treturn unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}";
var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";
var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";
var dithering_fragment = "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";
var dithering_pars_fragment = "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";
var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";
var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";
var shadowmap_pars_fragment = "#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";
var shadowmap_pars_vertex = "#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif";
var shadowmap_vertex = "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif";
var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}";
var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";
var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tuniform int boneTextureSize;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tfloat j = i * 4.0;\n\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\ty = dy * ( y + 0.5 );\n\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\treturn bone;\n\t}\n#endif";
var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";
var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";
var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";
var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";
var tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";
var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";
var transmission_fragment = "#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );\n#endif";
var transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\t\n\t\tvec2 lodFudge = pow( 1.95, lod ) / fullSize;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec2 fullSize = vec2( textureSize( sampler, 0 ) );\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn radiance;\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance * radiance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\t}\n#endif";
var uv_pars_fragment = "#ifdef USE_UV\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif";
var uv_pars_vertex = "#ifdef USE_UV\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_UV2\n\tattribute vec2 uv2;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif";
var uv_vertex = "#ifdef USE_UV\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif";
var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";
const vertex$h = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";
const fragment$h = "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
const vertex$g = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";
const fragment$g = "#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
const vertex$f = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";
const fragment$f = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
const vertex$e = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}";
const fragment$e = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}";
const vertex$d = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";
const fragment$d = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}";
const vertex$c = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";
const fragment$c = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
const vertex$b = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
const fragment$b = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
const vertex$a = "#include <common>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";
const fragment$a = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
const vertex$9 = "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
const fragment$9 = "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
const vertex$8 = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";
const fragment$8 = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
const vertex$7 = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";
const fragment$7 = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}";
const vertex$6 = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
const fragment$6 = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
const vertex$5 = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}";
const fragment$5 = "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n\t#endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
const vertex$4 = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
const fragment$4 = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
const vertex$3 = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";
const fragment$3 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
const vertex$2 = "#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
const fragment$2 = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";
const vertex$1 = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
const fragment$1 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";
const ShaderChunk = {
    alphamap_fragment: alphamap_fragment,
    alphamap_pars_fragment: alphamap_pars_fragment,
    alphatest_fragment: alphatest_fragment,
    alphatest_pars_fragment: alphatest_pars_fragment,
    aomap_fragment: aomap_fragment,
    aomap_pars_fragment: aomap_pars_fragment,
    begin_vertex: begin_vertex,
    beginnormal_vertex: beginnormal_vertex,
    bsdfs: bsdfs,
    iridescence_fragment: iridescence_fragment,
    bumpmap_pars_fragment: bumpmap_pars_fragment,
    clipping_planes_fragment: clipping_planes_fragment,
    clipping_planes_pars_fragment: clipping_planes_pars_fragment,
    clipping_planes_pars_vertex: clipping_planes_pars_vertex,
    clipping_planes_vertex: clipping_planes_vertex,
    color_fragment: color_fragment,
    color_pars_fragment: color_pars_fragment,
    color_pars_vertex: color_pars_vertex,
    color_vertex: color_vertex,
    common: common,
    cube_uv_reflection_fragment: cube_uv_reflection_fragment,
    defaultnormal_vertex: defaultnormal_vertex,
    displacementmap_pars_vertex: displacementmap_pars_vertex,
    displacementmap_vertex: displacementmap_vertex,
    emissivemap_fragment: emissivemap_fragment,
    emissivemap_pars_fragment: emissivemap_pars_fragment,
    encodings_fragment: encodings_fragment,
    encodings_pars_fragment: encodings_pars_fragment,
    envmap_fragment: envmap_fragment,
    envmap_common_pars_fragment: envmap_common_pars_fragment,
    envmap_pars_fragment: envmap_pars_fragment,
    envmap_pars_vertex: envmap_pars_vertex,
    envmap_physical_pars_fragment: envmap_physical_pars_fragment,
    envmap_vertex: envmap_vertex,
    fog_vertex: fog_vertex,
    fog_pars_vertex: fog_pars_vertex,
    fog_fragment: fog_fragment,
    fog_pars_fragment: fog_pars_fragment,
    gradientmap_pars_fragment: gradientmap_pars_fragment,
    lightmap_fragment: lightmap_fragment,
    lightmap_pars_fragment: lightmap_pars_fragment,
    lights_lambert_fragment: lights_lambert_fragment,
    lights_lambert_pars_fragment: lights_lambert_pars_fragment,
    lights_pars_begin: lights_pars_begin,
    lights_toon_fragment: lights_toon_fragment,
    lights_toon_pars_fragment: lights_toon_pars_fragment,
    lights_phong_fragment: lights_phong_fragment,
    lights_phong_pars_fragment: lights_phong_pars_fragment,
    lights_physical_fragment: lights_physical_fragment,
    lights_physical_pars_fragment: lights_physical_pars_fragment,
    lights_fragment_begin: lights_fragment_begin,
    lights_fragment_maps: lights_fragment_maps,
    lights_fragment_end: lights_fragment_end,
    logdepthbuf_fragment: logdepthbuf_fragment,
    logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
    logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
    logdepthbuf_vertex: logdepthbuf_vertex,
    map_fragment: map_fragment,
    map_pars_fragment: map_pars_fragment,
    map_particle_fragment: map_particle_fragment,
    map_particle_pars_fragment: map_particle_pars_fragment,
    metalnessmap_fragment: metalnessmap_fragment,
    metalnessmap_pars_fragment: metalnessmap_pars_fragment,
    morphcolor_vertex: morphcolor_vertex,
    morphnormal_vertex: morphnormal_vertex,
    morphtarget_pars_vertex: morphtarget_pars_vertex,
    morphtarget_vertex: morphtarget_vertex,
    normal_fragment_begin: normal_fragment_begin,
    normal_fragment_maps: normal_fragment_maps,
    normal_pars_fragment: normal_pars_fragment,
    normal_pars_vertex: normal_pars_vertex,
    normal_vertex: normal_vertex,
    normalmap_pars_fragment: normalmap_pars_fragment,
    clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
    clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
    clearcoat_pars_fragment: clearcoat_pars_fragment,
    iridescence_pars_fragment: iridescence_pars_fragment,
    output_fragment: output_fragment,
    packing: packing,
    premultiplied_alpha_fragment: premultiplied_alpha_fragment,
    project_vertex: project_vertex,
    dithering_fragment: dithering_fragment,
    dithering_pars_fragment: dithering_pars_fragment,
    roughnessmap_fragment: roughnessmap_fragment,
    roughnessmap_pars_fragment: roughnessmap_pars_fragment,
    shadowmap_pars_fragment: shadowmap_pars_fragment,
    shadowmap_pars_vertex: shadowmap_pars_vertex,
    shadowmap_vertex: shadowmap_vertex,
    shadowmask_pars_fragment: shadowmask_pars_fragment,
    skinbase_vertex: skinbase_vertex,
    skinning_pars_vertex: skinning_pars_vertex,
    skinning_vertex: skinning_vertex,
    skinnormal_vertex: skinnormal_vertex,
    specularmap_fragment: specularmap_fragment,
    specularmap_pars_fragment: specularmap_pars_fragment,
    tonemapping_fragment: tonemapping_fragment,
    tonemapping_pars_fragment: tonemapping_pars_fragment,
    transmission_fragment: transmission_fragment,
    transmission_pars_fragment: transmission_pars_fragment,
    uv_pars_fragment: uv_pars_fragment,
    uv_pars_vertex: uv_pars_vertex,
    uv_vertex: uv_vertex,
    worldpos_vertex: worldpos_vertex,
    background_vert: vertex$h,
    background_frag: fragment$h,
    backgroundCube_vert: vertex$g,
    backgroundCube_frag: fragment$g,
    cube_vert: vertex$f,
    cube_frag: fragment$f,
    depth_vert: vertex$e,
    depth_frag: fragment$e,
    distanceRGBA_vert: vertex$d,
    distanceRGBA_frag: fragment$d,
    equirect_vert: vertex$c,
    equirect_frag: fragment$c,
    linedashed_vert: vertex$b,
    linedashed_frag: fragment$b,
    meshbasic_vert: vertex$a,
    meshbasic_frag: fragment$a,
    meshlambert_vert: vertex$9,
    meshlambert_frag: fragment$9,
    meshmatcap_vert: vertex$8,
    meshmatcap_frag: fragment$8,
    meshnormal_vert: vertex$7,
    meshnormal_frag: fragment$7,
    meshphong_vert: vertex$6,
    meshphong_frag: fragment$6,
    meshphysical_vert: vertex$5,
    meshphysical_frag: fragment$5,
    meshtoon_vert: vertex$4,
    meshtoon_frag: fragment$4,
    points_vert: vertex$3,
    points_frag: fragment$3,
    shadow_vert: vertex$2,
    shadow_frag: fragment$2,
    sprite_vert: vertex$1,
    sprite_frag: fragment$1
};
const UniformsLib = {
    common: {
        diffuse: {
            value: new Color(0xffffff)
        },
        opacity: {
            value: 1.0
        },
        map: {
            value: null
        },
        mapTransform: {
            value: new Matrix3()
        },
        alphaMap: {
            value: null
        },
        alphaMapTransform: {
            value: new Matrix3()
        },
        alphaTest: {
            value: 0
        }
    },
    specularmap: {
        specularMap: {
            value: null
        },
        specularMapTransform: {
            value: new Matrix3()
        }
    },
    envmap: {
        envMap: {
            value: null
        },
        flipEnvMap: {
            value: -1
        },
        reflectivity: {
            value: 1.0
        },
        ior: {
            value: 1.5
        },
        refractionRatio: {
            value: 0.98
        }
    },
    aomap: {
        aoMap: {
            value: null
        },
        aoMapIntensity: {
            value: 1
        },
        aoMapTransform: {
            value: new Matrix3()
        }
    },
    lightmap: {
        lightMap: {
            value: null
        },
        lightMapIntensity: {
            value: 1
        },
        lightMapTransform: {
            value: new Matrix3()
        }
    },
    bumpmap: {
        bumpMap: {
            value: null
        },
        bumpMapTransform: {
            value: new Matrix3()
        },
        bumpScale: {
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            value: null
        },
        normalMapTransform: {
            value: new Matrix3()
        },
        normalScale: {
            value: new Vector2(1, 1)
        }
    },
    displacementmap: {
        displacementMap: {
            value: null
        },
        displacementMapTransform: {
            value: new Matrix3()
        },
        displacementScale: {
            value: 1
        },
        displacementBias: {
            value: 0
        }
    },
    emissivemap: {
        emissiveMap: {
            value: null
        },
        emissiveMapTransform: {
            value: new Matrix3()
        }
    },
    metalnessmap: {
        metalnessMap: {
            value: null
        },
        metalnessMapTransform: {
            value: new Matrix3()
        }
    },
    roughnessmap: {
        roughnessMap: {
            value: null
        },
        roughnessMapTransform: {
            value: new Matrix3()
        }
    },
    gradientmap: {
        gradientMap: {
            value: null
        }
    },
    fog: {
        fogDensity: {
            value: 0.00025
        },
        fogNear: {
            value: 1
        },
        fogFar: {
            value: 2000
        },
        fogColor: {
            value: new Color(0xffffff)
        }
    },
    lights: {
        ambientLightColor: {
            value: []
        },
        lightProbe: {
            value: []
        },
        directionalLights: {
            value: [],
            properties: {
                direction: {},
                color: {}
            }
        },
        directionalLightShadows: {
            value: [],
            properties: {
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {}
            }
        },
        directionalShadowMap: {
            value: []
        },
        directionalShadowMatrix: {
            value: []
        },
        spotLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                direction: {},
                distance: {},
                coneCos: {},
                penumbraCos: {},
                decay: {}
            }
        },
        spotLightShadows: {
            value: [],
            properties: {
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {}
            }
        },
        spotLightMap: {
            value: []
        },
        spotShadowMap: {
            value: []
        },
        spotLightMatrix: {
            value: []
        },
        pointLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                decay: {},
                distance: {}
            }
        },
        pointLightShadows: {
            value: [],
            properties: {
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {},
                shadowCameraNear: {},
                shadowCameraFar: {}
            }
        },
        pointShadowMap: {
            value: []
        },
        pointShadowMatrix: {
            value: []
        },
        hemisphereLights: {
            value: [],
            properties: {
                direction: {},
                skyColor: {},
                groundColor: {}
            }
        },
        rectAreaLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                width: {},
                height: {}
            }
        },
        ltc_1: {
            value: null
        },
        ltc_2: {
            value: null
        }
    },
    points: {
        diffuse: {
            value: new Color(0xffffff)
        },
        opacity: {
            value: 1.0
        },
        size: {
            value: 1.0
        },
        scale: {
            value: 1.0
        },
        map: {
            value: null
        },
        alphaMap: {
            value: null
        },
        alphaTest: {
            value: 0
        },
        uvTransform: {
            value: new Matrix3()
        }
    },
    sprite: {
        diffuse: {
            value: new Color(0xffffff)
        },
        opacity: {
            value: 1.0
        },
        center: {
            value: new Vector2(0.5, 0.5)
        },
        rotation: {
            value: 0.0
        },
        map: {
            value: null
        },
        mapTransform: {
            value: new Matrix3()
        },
        alphaMap: {
            value: null
        },
        alphaTest: {
            value: 0
        }
    }
};
const ShaderLib = {
    basic: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.specularmap,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.fog
        ]),
        vertexShader: ShaderChunk.meshbasic_vert,
        fragmentShader: ShaderChunk.meshbasic_frag
    },
    lambert: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.specularmap,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.emissivemap,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                emissive: {
                    value: new Color(0x000000)
                }
            }
        ]),
        vertexShader: ShaderChunk.meshlambert_vert,
        fragmentShader: ShaderChunk.meshlambert_frag
    },
    phong: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.specularmap,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.emissivemap,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                emissive: {
                    value: new Color(0x000000)
                },
                specular: {
                    value: new Color(0x111111)
                },
                shininess: {
                    value: 30
                }
            }
        ]),
        vertexShader: ShaderChunk.meshphong_vert,
        fragmentShader: ShaderChunk.meshphong_frag
    },
    standard: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.emissivemap,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.roughnessmap,
            UniformsLib.metalnessmap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                emissive: {
                    value: new Color(0x000000)
                },
                roughness: {
                    value: 1.0
                },
                metalness: {
                    value: 0.0
                },
                envMapIntensity: {
                    value: 1
                }
            }
        ]),
        vertexShader: ShaderChunk.meshphysical_vert,
        fragmentShader: ShaderChunk.meshphysical_frag
    },
    toon: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.emissivemap,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.gradientmap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                emissive: {
                    value: new Color(0x000000)
                }
            }
        ]),
        vertexShader: ShaderChunk.meshtoon_vert,
        fragmentShader: ShaderChunk.meshtoon_frag
    },
    matcap: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            UniformsLib.fog,
            {
                matcap: {
                    value: null
                }
            }
        ]),
        vertexShader: ShaderChunk.meshmatcap_vert,
        fragmentShader: ShaderChunk.meshmatcap_frag
    },
    points: {
        uniforms: mergeUniforms([
            UniformsLib.points,
            UniformsLib.fog
        ]),
        vertexShader: ShaderChunk.points_vert,
        fragmentShader: ShaderChunk.points_frag
    },
    dashed: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.fog,
            {
                scale: {
                    value: 1
                },
                dashSize: {
                    value: 1
                },
                totalSize: {
                    value: 2
                }
            }
        ]),
        vertexShader: ShaderChunk.linedashed_vert,
        fragmentShader: ShaderChunk.linedashed_frag
    },
    depth: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.displacementmap
        ]),
        vertexShader: ShaderChunk.depth_vert,
        fragmentShader: ShaderChunk.depth_frag
    },
    normal: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.bumpmap,
            UniformsLib.normalmap,
            UniformsLib.displacementmap,
            {
                opacity: {
                    value: 1.0
                }
            }
        ]),
        vertexShader: ShaderChunk.meshnormal_vert,
        fragmentShader: ShaderChunk.meshnormal_frag
    },
    sprite: {
        uniforms: mergeUniforms([
            UniformsLib.sprite,
            UniformsLib.fog
        ]),
        vertexShader: ShaderChunk.sprite_vert,
        fragmentShader: ShaderChunk.sprite_frag
    },
    background: {
        uniforms: {
            uvTransform: {
                value: new Matrix3()
            },
            t2D: {
                value: null
            },
            backgroundIntensity: {
                value: 1
            }
        },
        vertexShader: ShaderChunk.background_vert,
        fragmentShader: ShaderChunk.background_frag
    },
    backgroundCube: {
        uniforms: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            },
            backgroundBlurriness: {
                value: 0
            },
            backgroundIntensity: {
                value: 1
            }
        },
        vertexShader: ShaderChunk.backgroundCube_vert,
        fragmentShader: ShaderChunk.backgroundCube_frag
    },
    cube: {
        uniforms: {
            tCube: {
                value: null
            },
            tFlip: {
                value: -1
            },
            opacity: {
                value: 1.0
            }
        },
        vertexShader: ShaderChunk.cube_vert,
        fragmentShader: ShaderChunk.cube_frag
    },
    equirect: {
        uniforms: {
            tEquirect: {
                value: null
            }
        },
        vertexShader: ShaderChunk.equirect_vert,
        fragmentShader: ShaderChunk.equirect_frag
    },
    distanceRGBA: {
        uniforms: mergeUniforms([
            UniformsLib.common,
            UniformsLib.displacementmap,
            {
                referencePosition: {
                    value: new Vector3()
                },
                nearDistance: {
                    value: 1
                },
                farDistance: {
                    value: 1000
                }
            }
        ]),
        vertexShader: ShaderChunk.distanceRGBA_vert,
        fragmentShader: ShaderChunk.distanceRGBA_frag
    },
    shadow: {
        uniforms: mergeUniforms([
            UniformsLib.lights,
            UniformsLib.fog,
            {
                color: {
                    value: new Color(0x00000)
                },
                opacity: {
                    value: 1.0
                }
            }
        ]),
        vertexShader: ShaderChunk.shadow_vert,
        fragmentShader: ShaderChunk.shadow_frag
    }
};
ShaderLib.physical = {
    uniforms: mergeUniforms([
        ShaderLib.standard.uniforms,
        {
            clearcoat: {
                value: 0
            },
            clearcoatMap: {
                value: null
            },
            clearcoatMapTransform: {
                value: new Matrix3()
            },
            clearcoatNormalMap: {
                value: null
            },
            clearcoatNormalMapTransform: {
                value: new Matrix3()
            },
            clearcoatNormalScale: {
                value: new Vector2(1, 1)
            },
            clearcoatRoughness: {
                value: 0
            },
            clearcoatRoughnessMap: {
                value: null
            },
            clearcoatRoughnessMapTransform: {
                value: new Matrix3()
            },
            iridescence: {
                value: 0
            },
            iridescenceMap: {
                value: null
            },
            iridescenceMapTransform: {
                value: new Matrix3()
            },
            iridescenceIOR: {
                value: 1.3
            },
            iridescenceThicknessMinimum: {
                value: 100
            },
            iridescenceThicknessMaximum: {
                value: 400
            },
            iridescenceThicknessMap: {
                value: null
            },
            iridescenceThicknessMapTransform: {
                value: new Matrix3()
            },
            sheen: {
                value: 0
            },
            sheenColor: {
                value: new Color(0x000000)
            },
            sheenColorMap: {
                value: null
            },
            sheenColorMapTransform: {
                value: new Matrix3()
            },
            sheenRoughness: {
                value: 1
            },
            sheenRoughnessMap: {
                value: null
            },
            sheenRoughnessMapTransform: {
                value: new Matrix3()
            },
            transmission: {
                value: 0
            },
            transmissionMap: {
                value: null
            },
            transmissionMapTransform: {
                value: new Matrix3()
            },
            transmissionSamplerSize: {
                value: new Vector2()
            },
            transmissionSamplerMap: {
                value: null
            },
            thickness: {
                value: 0
            },
            thicknessMap: {
                value: null
            },
            thicknessMapTransform: {
                value: new Matrix3()
            },
            attenuationDistance: {
                value: 0
            },
            attenuationColor: {
                value: new Color(0x000000)
            },
            specularColor: {
                value: new Color(1, 1, 1)
            },
            specularColorMap: {
                value: null
            },
            specularColorMapTransform: {
                value: new Matrix3()
            },
            specularIntensity: {
                value: 1
            },
            specularIntensityMap: {
                value: null
            },
            specularIntensityMapTransform: {
                value: new Matrix3()
            }
        }
    ]),
    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag
};
const _rgb = {
    r: 0,
    b: 0,
    g: 0
};
function WebGLBackground(renderer, cubemaps, cubeuvmaps, state, objects, alpha, premultipliedAlpha) {
    const clearColor = new Color(0x000000);
    let clearAlpha = alpha === true ? 0 : 1;
    let planeMesh;
    let boxMesh;
    let currentBackground = null;
    let currentBackgroundVersion = 0;
    let currentTonemapping = null;
    function render(renderList, scene) {
        let forceClear = false;
        let background = scene.isScene === true ? scene.background : null;
        if (background && background.isTexture) {
            const usePMREM = scene.backgroundBlurriness > 0;
            background = (usePMREM ? cubeuvmaps : cubemaps).get(background);
        }
        const xr = renderer.xr;
        const session = xr.getSession && xr.getSession();
        if (session && session.environmentBlendMode === 'additive') {
            background = null;
        }
        if (background === null) {
            setClear(clearColor, clearAlpha);
        } else if (background && background.isColor) {
            setClear(background, 1);
            forceClear = true;
        }
        if (renderer.autoClear || forceClear) {
            renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        }
        if (background && (background.isCubeTexture || background.mapping === 306)) {
            if (boxMesh === undefined) {
                boxMesh = new Mesh(new BoxGeometry(1, 1, 1), new ShaderMaterial({
                    name: 'BackgroundCubeMaterial',
                    uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
                    vertexShader: ShaderLib.backgroundCube.vertexShader,
                    fragmentShader: ShaderLib.backgroundCube.fragmentShader,
                    side: BackSide,
                    depthTest: false,
                    depthWrite: false,
                    fog: false
                }));
                boxMesh.geometry.deleteAttribute('normal');
                boxMesh.geometry.deleteAttribute('uv');
                boxMesh.onBeforeRender = function(renderer, scene, camera) {
                    this.matrixWorld.copyPosition(camera.matrixWorld);
                };
                Object.defineProperty(boxMesh.material, 'envMap', {
                    get: function() {
                        return this.uniforms.envMap.value;
                    }
                });
                objects.update(boxMesh);
            }
            boxMesh.material.uniforms.envMap.value = background;
            boxMesh.material.uniforms.flipEnvMap.value = background.isCubeTexture && background.isRenderTargetTexture === false ? -1 : 1;
            boxMesh.material.uniforms.backgroundBlurriness.value = scene.backgroundBlurriness;
            boxMesh.material.uniforms.backgroundIntensity.value = scene.backgroundIntensity;
            boxMesh.material.toneMapped = background.encoding === sRGBEncoding ? false : true;
            if (currentBackground !== background || currentBackgroundVersion !== background.version || currentTonemapping !== renderer.toneMapping) {
                boxMesh.material.needsUpdate = true;
                currentBackground = background;
                currentBackgroundVersion = background.version;
                currentTonemapping = renderer.toneMapping;
            }
            boxMesh.layers.enableAll();
            renderList.unshift(boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null);
        } else if (background && background.isTexture) {
            if (planeMesh === undefined) {
                planeMesh = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({
                    name: 'BackgroundMaterial',
                    uniforms: cloneUniforms(ShaderLib.background.uniforms),
                    vertexShader: ShaderLib.background.vertexShader,
                    fragmentShader: ShaderLib.background.fragmentShader,
                    side: FrontSide,
                    depthTest: false,
                    depthWrite: false,
                    fog: false
                }));
                planeMesh.geometry.deleteAttribute('normal');
                Object.defineProperty(planeMesh.material, 'map', {
                    get: function() {
                        return this.uniforms.t2D.value;
                    }
                });
                objects.update(planeMesh);
            }
            planeMesh.material.uniforms.t2D.value = background;
            planeMesh.material.uniforms.backgroundIntensity.value = scene.backgroundIntensity;
            planeMesh.material.toneMapped = background.encoding === sRGBEncoding ? false : true;
            if (background.matrixAutoUpdate === true) {
                background.updateMatrix();
            }
            planeMesh.material.uniforms.uvTransform.value.copy(background.matrix);
            if (currentBackground !== background || currentBackgroundVersion !== background.version || currentTonemapping !== renderer.toneMapping) {
                planeMesh.material.needsUpdate = true;
                currentBackground = background;
                currentBackgroundVersion = background.version;
                currentTonemapping = renderer.toneMapping;
            }
            planeMesh.layers.enableAll();
            renderList.unshift(planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null);
        }
    }
    function setClear(color, alpha) {
        color.getRGB(_rgb, getUnlitUniformColorSpace(renderer));
        state.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, alpha, premultipliedAlpha);
    }
    return {
        getClearColor: function() {
            return clearColor;
        },
        setClearColor: function(color, alpha = 1) {
            clearColor.set(color);
            clearAlpha = alpha;
            setClear(clearColor, clearAlpha);
        },
        getClearAlpha: function() {
            return clearAlpha;
        },
        setClearAlpha: function(alpha) {
            clearAlpha = alpha;
            setClear(clearColor, clearAlpha);
        },
        render: render
    };
}
function WebGLBindingStates(gl, extensions, attributes, capabilities) {
    const maxVertexAttributes = gl.getParameter(34921);
    const extension = capabilities.isWebGL2 ? null : extensions.get('OES_vertex_array_object');
    const vaoAvailable = capabilities.isWebGL2 || extension !== null;
    const bindingStates = {};
    const defaultState = createBindingState(null);
    let currentState = defaultState;
    let forceUpdate = false;
    function setup(object, material, program, geometry, index) {
        let updateBuffers = false;
        if (vaoAvailable) {
            const state = getBindingState(geometry, program, material);
            if (currentState !== state) {
                currentState = state;
                bindVertexArrayObject(currentState.object);
            }
            updateBuffers = needsUpdate(object, geometry, program, index);
            if (updateBuffers) saveCache(object, geometry, program, index);
        } else {
            const wireframe = material.wireframe === true;
            if (currentState.geometry !== geometry.id || currentState.program !== program.id || currentState.wireframe !== wireframe) {
                currentState.geometry = geometry.id;
                currentState.program = program.id;
                currentState.wireframe = wireframe;
                updateBuffers = true;
            }
        }
        if (index !== null) {
            attributes.update(index, 34963);
        }
        if (updateBuffers || forceUpdate) {
            forceUpdate = false;
            setupVertexAttributes(object, material, program, geometry);
            if (index !== null) {
                gl.bindBuffer(34963, attributes.get(index).buffer);
            }
        }
    }
    function createVertexArrayObject() {
        if (capabilities.isWebGL2) return gl.createVertexArray();
        return extension.createVertexArrayOES();
    }
    function bindVertexArrayObject(vao) {
        if (capabilities.isWebGL2) return gl.bindVertexArray(vao);
        return extension.bindVertexArrayOES(vao);
    }
    function deleteVertexArrayObject(vao) {
        if (capabilities.isWebGL2) return gl.deleteVertexArray(vao);
        return extension.deleteVertexArrayOES(vao);
    }
    function getBindingState(geometry, program, material) {
        const wireframe = material.wireframe === true;
        let programMap = bindingStates[geometry.id];
        if (programMap === undefined) {
            programMap = {};
            bindingStates[geometry.id] = programMap;
        }
        let stateMap = programMap[program.id];
        if (stateMap === undefined) {
            stateMap = {};
            programMap[program.id] = stateMap;
        }
        let state = stateMap[wireframe];
        if (state === undefined) {
            state = createBindingState(createVertexArrayObject());
            stateMap[wireframe] = state;
        }
        return state;
    }
    function createBindingState(vao) {
        const newAttributes = [];
        const enabledAttributes = [];
        const attributeDivisors = [];
        for(let i = 0; i < maxVertexAttributes; i++){
            newAttributes[i] = 0;
            enabledAttributes[i] = 0;
            attributeDivisors[i] = 0;
        }
        return {
            geometry: null,
            program: null,
            wireframe: false,
            newAttributes: newAttributes,
            enabledAttributes: enabledAttributes,
            attributeDivisors: attributeDivisors,
            object: vao,
            attributes: {},
            index: null
        };
    }
    function needsUpdate(object, geometry, program, index) {
        const cachedAttributes = currentState.attributes;
        const geometryAttributes = geometry.attributes;
        let attributesNum = 0;
        const programAttributes = program.getAttributes();
        for(const name in programAttributes){
            const programAttribute = programAttributes[name];
            if (programAttribute.location >= 0) {
                const cachedAttribute = cachedAttributes[name];
                let geometryAttribute = geometryAttributes[name];
                if (geometryAttribute === undefined) {
                    if (name === 'instanceMatrix' && object.instanceMatrix) geometryAttribute = object.instanceMatrix;
                    if (name === 'instanceColor' && object.instanceColor) geometryAttribute = object.instanceColor;
                }
                if (cachedAttribute === undefined) return true;
                if (cachedAttribute.attribute !== geometryAttribute) return true;
                if (geometryAttribute && cachedAttribute.data !== geometryAttribute.data) return true;
                attributesNum++;
            }
        }
        if (currentState.attributesNum !== attributesNum) return true;
        if (currentState.index !== index) return true;
        return false;
    }
    function saveCache(object, geometry, program, index) {
        const cache = {};
        const attributes = geometry.attributes;
        let attributesNum = 0;
        const programAttributes = program.getAttributes();
        for(const name in programAttributes){
            const programAttribute = programAttributes[name];
            if (programAttribute.location >= 0) {
                let attribute = attributes[name];
                if (attribute === undefined) {
                    if (name === 'instanceMatrix' && object.instanceMatrix) attribute = object.instanceMatrix;
                    if (name === 'instanceColor' && object.instanceColor) attribute = object.instanceColor;
                }
                const data = {};
                data.attribute = attribute;
                if (attribute && attribute.data) {
                    data.data = attribute.data;
                }
                cache[name] = data;
                attributesNum++;
            }
        }
        currentState.attributes = cache;
        currentState.attributesNum = attributesNum;
        currentState.index = index;
    }
    function initAttributes() {
        const newAttributes = currentState.newAttributes;
        for(let i = 0, il = newAttributes.length; i < il; i++){
            newAttributes[i] = 0;
        }
    }
    function enableAttribute(attribute) {
        enableAttributeAndDivisor(attribute, 0);
    }
    function enableAttributeAndDivisor(attribute, meshPerAttribute) {
        const newAttributes = currentState.newAttributes;
        const enabledAttributes = currentState.enabledAttributes;
        const attributeDivisors = currentState.attributeDivisors;
        newAttributes[attribute] = 1;
        if (enabledAttributes[attribute] === 0) {
            gl.enableVertexAttribArray(attribute);
            enabledAttributes[attribute] = 1;
        }
        if (attributeDivisors[attribute] !== meshPerAttribute) {
            const extension = capabilities.isWebGL2 ? gl : extensions.get('ANGLE_instanced_arrays');
            extension[capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](attribute, meshPerAttribute);
            attributeDivisors[attribute] = meshPerAttribute;
        }
    }
    function disableUnusedAttributes() {
        const newAttributes = currentState.newAttributes;
        const enabledAttributes = currentState.enabledAttributes;
        for(let i = 0, il = enabledAttributes.length; i < il; i++){
            if (enabledAttributes[i] !== newAttributes[i]) {
                gl.disableVertexAttribArray(i);
                enabledAttributes[i] = 0;
            }
        }
    }
    function vertexAttribPointer(index, size, type, normalized, stride, offset) {
        if (capabilities.isWebGL2 === true && (type === 5124 || type === 5125)) {
            gl.vertexAttribIPointer(index, size, type, stride, offset);
        } else {
            gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
        }
    }
    function setupVertexAttributes(object, material, program, geometry) {
        if (capabilities.isWebGL2 === false && (object.isInstancedMesh || geometry.isInstancedBufferGeometry)) {
            if (extensions.get('ANGLE_instanced_arrays') === null) return;
        }
        initAttributes();
        const geometryAttributes = geometry.attributes;
        const programAttributes = program.getAttributes();
        const materialDefaultAttributeValues = material.defaultAttributeValues;
        for(const name in programAttributes){
            const programAttribute = programAttributes[name];
            if (programAttribute.location >= 0) {
                let geometryAttribute = geometryAttributes[name];
                if (geometryAttribute === undefined) {
                    if (name === 'instanceMatrix' && object.instanceMatrix) geometryAttribute = object.instanceMatrix;
                    if (name === 'instanceColor' && object.instanceColor) geometryAttribute = object.instanceColor;
                }
                if (geometryAttribute !== undefined) {
                    const normalized = geometryAttribute.normalized;
                    const size = geometryAttribute.itemSize;
                    const attribute = attributes.get(geometryAttribute);
                    if (attribute === undefined) continue;
                    const buffer = attribute.buffer;
                    const type = attribute.type;
                    const bytesPerElement = attribute.bytesPerElement;
                    if (geometryAttribute.isInterleavedBufferAttribute) {
                        const data = geometryAttribute.data;
                        const stride = data.stride;
                        const offset = geometryAttribute.offset;
                        if (data.isInstancedInterleavedBuffer) {
                            for(let i = 0; i < programAttribute.locationSize; i++){
                                enableAttributeAndDivisor(programAttribute.location + i, data.meshPerAttribute);
                            }
                            if (object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined) {
                                geometry._maxInstanceCount = data.meshPerAttribute * data.count;
                            }
                        } else {
                            for(let i1 = 0; i1 < programAttribute.locationSize; i1++){
                                enableAttribute(programAttribute.location + i1);
                            }
                        }
                        gl.bindBuffer(34962, buffer);
                        for(let i2 = 0; i2 < programAttribute.locationSize; i2++){
                            vertexAttribPointer(programAttribute.location + i2, size / programAttribute.locationSize, type, normalized, stride * bytesPerElement, (offset + size / programAttribute.locationSize * i2) * bytesPerElement);
                        }
                    } else {
                        if (geometryAttribute.isInstancedBufferAttribute) {
                            for(let i3 = 0; i3 < programAttribute.locationSize; i3++){
                                enableAttributeAndDivisor(programAttribute.location + i3, geometryAttribute.meshPerAttribute);
                            }
                            if (object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined) {
                                geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                            }
                        } else {
                            for(let i4 = 0; i4 < programAttribute.locationSize; i4++){
                                enableAttribute(programAttribute.location + i4);
                            }
                        }
                        gl.bindBuffer(34962, buffer);
                        for(let i5 = 0; i5 < programAttribute.locationSize; i5++){
                            vertexAttribPointer(programAttribute.location + i5, size / programAttribute.locationSize, type, normalized, size * bytesPerElement, size / programAttribute.locationSize * i5 * bytesPerElement);
                        }
                    }
                } else if (materialDefaultAttributeValues !== undefined) {
                    const value = materialDefaultAttributeValues[name];
                    if (value !== undefined) {
                        switch(value.length){
                            case 2:
                                gl.vertexAttrib2fv(programAttribute.location, value);
                                break;
                            case 3:
                                gl.vertexAttrib3fv(programAttribute.location, value);
                                break;
                            case 4:
                                gl.vertexAttrib4fv(programAttribute.location, value);
                                break;
                            default:
                                gl.vertexAttrib1fv(programAttribute.location, value);
                        }
                    }
                }
            }
        }
        disableUnusedAttributes();
    }
    function dispose() {
        reset();
        for(const geometryId in bindingStates){
            const programMap = bindingStates[geometryId];
            for(const programId in programMap){
                const stateMap = programMap[programId];
                for(const wireframe in stateMap){
                    deleteVertexArrayObject(stateMap[wireframe].object);
                    delete stateMap[wireframe];
                }
                delete programMap[programId];
            }
            delete bindingStates[geometryId];
        }
    }
    function releaseStatesOfGeometry(geometry) {
        if (bindingStates[geometry.id] === undefined) return;
        const programMap = bindingStates[geometry.id];
        for(const programId in programMap){
            const stateMap = programMap[programId];
            for(const wireframe in stateMap){
                deleteVertexArrayObject(stateMap[wireframe].object);
                delete stateMap[wireframe];
            }
            delete programMap[programId];
        }
        delete bindingStates[geometry.id];
    }
    function releaseStatesOfProgram(program) {
        for(const geometryId in bindingStates){
            const programMap = bindingStates[geometryId];
            if (programMap[program.id] === undefined) continue;
            const stateMap = programMap[program.id];
            for(const wireframe in stateMap){
                deleteVertexArrayObject(stateMap[wireframe].object);
                delete stateMap[wireframe];
            }
            delete programMap[program.id];
        }
    }
    function reset() {
        resetDefaultState();
        forceUpdate = true;
        if (currentState === defaultState) return;
        currentState = defaultState;
        bindVertexArrayObject(currentState.object);
    }
    function resetDefaultState() {
        defaultState.geometry = null;
        defaultState.program = null;
        defaultState.wireframe = false;
    }
    return {
        setup: setup,
        reset: reset,
        resetDefaultState: resetDefaultState,
        dispose: dispose,
        releaseStatesOfGeometry: releaseStatesOfGeometry,
        releaseStatesOfProgram: releaseStatesOfProgram,
        initAttributes: initAttributes,
        enableAttribute: enableAttribute,
        disableUnusedAttributes: disableUnusedAttributes
    };
}
function WebGLBufferRenderer(gl, extensions, info, capabilities) {
    const isWebGL2 = capabilities.isWebGL2;
    let mode;
    function setMode(value) {
        mode = value;
    }
    function render(start, count) {
        gl.drawArrays(mode, start, count);
        info.update(count, mode, 1);
    }
    function renderInstances(start, count, primcount) {
        if (primcount === 0) return;
        let extension, methodName;
        if (isWebGL2) {
            extension = gl;
            methodName = 'drawArraysInstanced';
        } else {
            extension = extensions.get('ANGLE_instanced_arrays');
            methodName = 'drawArraysInstancedANGLE';
            if (extension === null) {
                console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                return;
            }
        }
        extension[methodName](mode, start, count, primcount);
        info.update(count, mode, primcount);
    }
    this.setMode = setMode;
    this.render = render;
    this.renderInstances = renderInstances;
}
function WebGLCapabilities(gl, extensions, parameters) {
    let maxAnisotropy;
    function getMaxAnisotropy() {
        if (maxAnisotropy !== undefined) return maxAnisotropy;
        if (extensions.has('EXT_texture_filter_anisotropic') === true) {
            const extension = extensions.get('EXT_texture_filter_anisotropic');
            maxAnisotropy = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        } else {
            maxAnisotropy = 0;
        }
        return maxAnisotropy;
    }
    function getMaxPrecision(precision) {
        if (precision === 'highp') {
            if (gl.getShaderPrecisionFormat(35633, 36338).precision > 0 && gl.getShaderPrecisionFormat(35632, 36338).precision > 0) {
                return 'highp';
            }
            precision = 'mediump';
        }
        if (precision === 'mediump') {
            if (gl.getShaderPrecisionFormat(35633, 36337).precision > 0 && gl.getShaderPrecisionFormat(35632, 36337).precision > 0) {
                return 'mediump';
            }
        }
        return 'lowp';
    }
    const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl.constructor.name === 'WebGL2RenderingContext';
    let precision = parameters.precision !== undefined ? parameters.precision : 'highp';
    const maxPrecision = getMaxPrecision(precision);
    if (maxPrecision !== precision) {
        console.warn('THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.');
        precision = maxPrecision;
    }
    const drawBuffers = isWebGL2 || extensions.has('WEBGL_draw_buffers');
    const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;
    const maxTextures = gl.getParameter(34930);
    const maxVertexTextures = gl.getParameter(35660);
    const maxTextureSize = gl.getParameter(3379);
    const maxCubemapSize = gl.getParameter(34076);
    const maxAttributes = gl.getParameter(34921);
    const maxVertexUniforms = gl.getParameter(36347);
    const maxVaryings = gl.getParameter(36348);
    const maxFragmentUniforms = gl.getParameter(36349);
    const vertexTextures = maxVertexTextures > 0;
    const floatFragmentTextures = isWebGL2 || extensions.has('OES_texture_float');
    const floatVertexTextures = vertexTextures && floatFragmentTextures;
    const maxSamples = isWebGL2 ? gl.getParameter(36183) : 0;
    return {
        isWebGL2: isWebGL2,
        drawBuffers: drawBuffers,
        getMaxAnisotropy: getMaxAnisotropy,
        getMaxPrecision: getMaxPrecision,
        precision: precision,
        logarithmicDepthBuffer: logarithmicDepthBuffer,
        maxTextures: maxTextures,
        maxVertexTextures: maxVertexTextures,
        maxTextureSize: maxTextureSize,
        maxCubemapSize: maxCubemapSize,
        maxAttributes: maxAttributes,
        maxVertexUniforms: maxVertexUniforms,
        maxVaryings: maxVaryings,
        maxFragmentUniforms: maxFragmentUniforms,
        vertexTextures: vertexTextures,
        floatFragmentTextures: floatFragmentTextures,
        floatVertexTextures: floatVertexTextures,
        maxSamples: maxSamples
    };
}
function WebGLClipping(properties) {
    const scope = this;
    let globalState = null, numGlobalPlanes = 0, localClippingEnabled = false, renderingShadows = false;
    const plane = new Plane(), viewNormalMatrix = new Matrix3(), uniform = {
        value: null,
        needsUpdate: false
    };
    this.uniform = uniform;
    this.numPlanes = 0;
    this.numIntersection = 0;
    this.init = function(planes, enableLocalClipping) {
        const enabled = planes.length !== 0 || enableLocalClipping || numGlobalPlanes !== 0 || localClippingEnabled;
        localClippingEnabled = enableLocalClipping;
        numGlobalPlanes = planes.length;
        return enabled;
    };
    this.beginShadows = function() {
        renderingShadows = true;
        projectPlanes(null);
    };
    this.endShadows = function() {
        renderingShadows = false;
    };
    this.setGlobalState = function(planes, camera) {
        globalState = projectPlanes(planes, camera, 0);
    };
    this.setState = function(material, camera, useCache) {
        const planes = material.clippingPlanes, clipIntersection = material.clipIntersection, clipShadows = material.clipShadows;
        const materialProperties = properties.get(material);
        if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {
            if (renderingShadows) {
                projectPlanes(null);
            } else {
                resetGlobalState();
            }
        } else {
            const nGlobal = renderingShadows ? 0 : numGlobalPlanes, lGlobal = nGlobal * 4;
            let dstArray = materialProperties.clippingState || null;
            uniform.value = dstArray;
            dstArray = projectPlanes(planes, camera, lGlobal, useCache);
            for(let i = 0; i !== lGlobal; ++i){
                dstArray[i] = globalState[i];
            }
            materialProperties.clippingState = dstArray;
            this.numIntersection = clipIntersection ? this.numPlanes : 0;
            this.numPlanes += nGlobal;
        }
    };
    function resetGlobalState() {
        if (uniform.value !== globalState) {
            uniform.value = globalState;
            uniform.needsUpdate = numGlobalPlanes > 0;
        }
        scope.numPlanes = numGlobalPlanes;
        scope.numIntersection = 0;
    }
    function projectPlanes(planes, camera, dstOffset, skipTransform) {
        const nPlanes = planes !== null ? planes.length : 0;
        let dstArray = null;
        if (nPlanes !== 0) {
            dstArray = uniform.value;
            if (skipTransform !== true || dstArray === null) {
                const flatSize = dstOffset + nPlanes * 4, viewMatrix = camera.matrixWorldInverse;
                viewNormalMatrix.getNormalMatrix(viewMatrix);
                if (dstArray === null || dstArray.length < flatSize) {
                    dstArray = new Float32Array(flatSize);
                }
                for(let i = 0, i4 = dstOffset; i !== nPlanes; ++i, i4 += 4){
                    plane.copy(planes[i]).applyMatrix4(viewMatrix, viewNormalMatrix);
                    plane.normal.toArray(dstArray, i4);
                    dstArray[i4 + 3] = plane.constant;
                }
            }
            uniform.value = dstArray;
            uniform.needsUpdate = true;
        }
        scope.numPlanes = nPlanes;
        scope.numIntersection = 0;
        return dstArray;
    }
}
function WebGLCubeMaps(renderer) {
    let cubemaps = new WeakMap();
    function mapTextureMapping(texture, mapping) {
        if (mapping === 303) {
            texture.mapping = CubeReflectionMapping;
        } else if (mapping === 304) {
            texture.mapping = CubeRefractionMapping;
        }
        return texture;
    }
    function get(texture) {
        if (texture && texture.isTexture && texture.isRenderTargetTexture === false) {
            const mapping = texture.mapping;
            if (mapping === 303 || mapping === 304) {
                if (cubemaps.has(texture)) {
                    const cubemap = cubemaps.get(texture).texture;
                    return mapTextureMapping(cubemap, texture.mapping);
                } else {
                    const image = texture.image;
                    if (image && image.height > 0) {
                        const renderTarget = new WebGLCubeRenderTarget(image.height / 2);
                        renderTarget.fromEquirectangularTexture(renderer, texture);
                        cubemaps.set(texture, renderTarget);
                        texture.addEventListener('dispose', onTextureDispose);
                        return mapTextureMapping(renderTarget.texture, texture.mapping);
                    } else {
                        return null;
                    }
                }
            }
        }
        return texture;
    }
    function onTextureDispose(event) {
        const texture = event.target;
        texture.removeEventListener('dispose', onTextureDispose);
        const cubemap = cubemaps.get(texture);
        if (cubemap !== undefined) {
            cubemaps.delete(texture);
            cubemap.dispose();
        }
    }
    function dispose() {
        cubemaps = new WeakMap();
    }
    return {
        get: get,
        dispose: dispose
    };
}
class OrthographicCamera extends Camera {
    constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000){
        super();
        this.isOrthographicCamera = true;
        this.type = 'OrthographicCamera';
        this.zoom = 1;
        this.view = null;
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.near = near;
        this.far = far;
        this.updateProjectionMatrix();
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.left = source.left;
        this.right = source.right;
        this.top = source.top;
        this.bottom = source.bottom;
        this.near = source.near;
        this.far = source.far;
        this.zoom = source.zoom;
        this.view = source.view === null ? null : Object.assign({}, source.view);
        return this;
    }
    setViewOffset(fullWidth, fullHeight, x, y, width, height) {
        if (this.view === null) {
            this.view = {
                enabled: true,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            };
        }
        this.view.enabled = true;
        this.view.fullWidth = fullWidth;
        this.view.fullHeight = fullHeight;
        this.view.offsetX = x;
        this.view.offsetY = y;
        this.view.width = width;
        this.view.height = height;
        this.updateProjectionMatrix();
    }
    clearViewOffset() {
        if (this.view !== null) {
            this.view.enabled = false;
        }
        this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
        const dx = (this.right - this.left) / (2 * this.zoom);
        const dy = (this.top - this.bottom) / (2 * this.zoom);
        const cx = (this.right + this.left) / 2;
        const cy = (this.top + this.bottom) / 2;
        let left = cx - dx;
        let right = cx + dx;
        let top = cy + dy;
        let bottom = cy - dy;
        if (this.view !== null && this.view.enabled) {
            const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom;
            const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
            left += scaleW * this.view.offsetX;
            right = left + scaleW * this.view.width;
            top -= scaleH * this.view.offsetY;
            bottom = top - scaleH * this.view.height;
        }
        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(meta) {
        const data = super.toJSON(meta);
        data.object.zoom = this.zoom;
        data.object.left = this.left;
        data.object.right = this.right;
        data.object.top = this.top;
        data.object.bottom = this.bottom;
        data.object.near = this.near;
        data.object.far = this.far;
        if (this.view !== null) data.object.view = Object.assign({}, this.view);
        return data;
    }
}
const LOD_MIN = 4;
const EXTRA_LOD_SIGMA = [
    0.125,
    0.215,
    0.35,
    0.446,
    0.526,
    0.582
];
const _flatCamera = new OrthographicCamera();
const _clearColor = new Color();
let _oldTarget = null;
const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;
const _axisDirections = [
    new Vector3(1, 1, 1),
    new Vector3(-1, 1, 1),
    new Vector3(1, 1, -1),
    new Vector3(-1, 1, -1),
    new Vector3(0, PHI, INV_PHI),
    new Vector3(0, PHI, -INV_PHI),
    new Vector3(INV_PHI, 0, PHI),
    new Vector3(-INV_PHI, 0, PHI),
    new Vector3(PHI, INV_PHI, 0),
    new Vector3(-PHI, INV_PHI, 0)
];
class PMREMGenerator {
    constructor(renderer){
        this._renderer = renderer;
        this._pingPongRenderTarget = null;
        this._lodMax = 0;
        this._cubeSize = 0;
        this._lodPlanes = [];
        this._sizeLods = [];
        this._sigmas = [];
        this._blurMaterial = null;
        this._cubemapMaterial = null;
        this._equirectMaterial = null;
        this._compileMaterial(this._blurMaterial);
    }
    fromScene(scene, sigma = 0, near = 0.1, far = 100) {
        _oldTarget = this._renderer.getRenderTarget();
        this._setSize(256);
        const cubeUVRenderTarget = this._allocateTargets();
        cubeUVRenderTarget.depthBuffer = true;
        this._sceneToCubeUV(scene, near, far, cubeUVRenderTarget);
        if (sigma > 0) {
            this._blur(cubeUVRenderTarget, 0, 0, sigma);
        }
        this._applyPMREM(cubeUVRenderTarget);
        this._cleanup(cubeUVRenderTarget);
        return cubeUVRenderTarget;
    }
    fromEquirectangular(equirectangular, renderTarget = null) {
        return this._fromTexture(equirectangular, renderTarget);
    }
    fromCubemap(cubemap, renderTarget = null) {
        return this._fromTexture(cubemap, renderTarget);
    }
    compileCubemapShader() {
        if (this._cubemapMaterial === null) {
            this._cubemapMaterial = _getCubemapMaterial();
            this._compileMaterial(this._cubemapMaterial);
        }
    }
    compileEquirectangularShader() {
        if (this._equirectMaterial === null) {
            this._equirectMaterial = _getEquirectMaterial();
            this._compileMaterial(this._equirectMaterial);
        }
    }
    dispose() {
        this._dispose();
        if (this._cubemapMaterial !== null) this._cubemapMaterial.dispose();
        if (this._equirectMaterial !== null) this._equirectMaterial.dispose();
    }
    _setSize(cubeSize) {
        this._lodMax = Math.floor(Math.log2(cubeSize));
        this._cubeSize = Math.pow(2, this._lodMax);
    }
    _dispose() {
        if (this._blurMaterial !== null) this._blurMaterial.dispose();
        if (this._pingPongRenderTarget !== null) this._pingPongRenderTarget.dispose();
        for(let i = 0; i < this._lodPlanes.length; i++){
            this._lodPlanes[i].dispose();
        }
    }
    _cleanup(outputTarget) {
        this._renderer.setRenderTarget(_oldTarget);
        outputTarget.scissorTest = false;
        _setViewport(outputTarget, 0, 0, outputTarget.width, outputTarget.height);
    }
    _fromTexture(texture, renderTarget) {
        if (texture.mapping === 301 || texture.mapping === 302) {
            this._setSize(texture.image.length === 0 ? 16 : texture.image[0].width || texture.image[0].image.width);
        } else {
            this._setSize(texture.image.width / 4);
        }
        _oldTarget = this._renderer.getRenderTarget();
        const cubeUVRenderTarget = renderTarget || this._allocateTargets();
        this._textureToCubeUV(texture, cubeUVRenderTarget);
        this._applyPMREM(cubeUVRenderTarget);
        this._cleanup(cubeUVRenderTarget);
        return cubeUVRenderTarget;
    }
    _allocateTargets() {
        const width = 3 * Math.max(this._cubeSize, 16 * 7);
        const height = 4 * this._cubeSize;
        const params = {
            magFilter: 1006,
            minFilter: 1006,
            generateMipmaps: false,
            type: 1016,
            format: 1023,
            encoding: 3000,
            depthBuffer: false
        };
        const cubeUVRenderTarget = _createRenderTarget(width, height, params);
        if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== width || this._pingPongRenderTarget.height !== height) {
            if (this._pingPongRenderTarget !== null) {
                this._dispose();
            }
            this._pingPongRenderTarget = _createRenderTarget(width, height, params);
            const { _lodMax  } = this;
            ({ sizeLods: this._sizeLods , lodPlanes: this._lodPlanes , sigmas: this._sigmas  } = _createPlanes(_lodMax));
            this._blurMaterial = _getBlurShader(_lodMax, width, height);
        }
        return cubeUVRenderTarget;
    }
    _compileMaterial(material) {
        const tmpMesh = new Mesh(this._lodPlanes[0], material);
        this._renderer.compile(tmpMesh, _flatCamera);
    }
    _sceneToCubeUV(scene, near, far, cubeUVRenderTarget) {
        const cubeCamera = new PerspectiveCamera(90, 1, near, far);
        const upSign = [
            1,
            -1,
            1,
            1,
            1,
            1
        ];
        const forwardSign = [
            1,
            1,
            1,
            -1,
            -1,
            -1
        ];
        const renderer = this._renderer;
        const originalAutoClear = renderer.autoClear;
        const toneMapping = renderer.toneMapping;
        renderer.getClearColor(_clearColor);
        renderer.toneMapping = NoToneMapping;
        renderer.autoClear = false;
        const backgroundMaterial = new MeshBasicMaterial({
            name: 'PMREM.Background',
            side: 1,
            depthWrite: false,
            depthTest: false
        });
        const backgroundBox = new Mesh(new BoxGeometry(), backgroundMaterial);
        let useSolidColor = false;
        const background = scene.background;
        if (background) {
            if (background.isColor) {
                backgroundMaterial.color.copy(background);
                scene.background = null;
                useSolidColor = true;
            }
        } else {
            backgroundMaterial.color.copy(_clearColor);
            useSolidColor = true;
        }
        for(let i = 0; i < 6; i++){
            const col = i % 3;
            if (col === 0) {
                cubeCamera.up.set(0, upSign[i], 0);
                cubeCamera.lookAt(forwardSign[i], 0, 0);
            } else if (col === 1) {
                cubeCamera.up.set(0, 0, upSign[i]);
                cubeCamera.lookAt(0, forwardSign[i], 0);
            } else {
                cubeCamera.up.set(0, upSign[i], 0);
                cubeCamera.lookAt(0, 0, forwardSign[i]);
            }
            const size = this._cubeSize;
            _setViewport(cubeUVRenderTarget, col * size, i > 2 ? size : 0, size, size);
            renderer.setRenderTarget(cubeUVRenderTarget);
            if (useSolidColor) {
                renderer.render(backgroundBox, cubeCamera);
            }
            renderer.render(scene, cubeCamera);
        }
        backgroundBox.geometry.dispose();
        backgroundBox.material.dispose();
        renderer.toneMapping = toneMapping;
        renderer.autoClear = originalAutoClear;
        scene.background = background;
    }
    _textureToCubeUV(texture, cubeUVRenderTarget) {
        const renderer = this._renderer;
        const isCubeTexture = texture.mapping === 301 || texture.mapping === 302;
        if (isCubeTexture) {
            if (this._cubemapMaterial === null) {
                this._cubemapMaterial = _getCubemapMaterial();
            }
            this._cubemapMaterial.uniforms.flipEnvMap.value = texture.isRenderTargetTexture === false ? -1 : 1;
        } else {
            if (this._equirectMaterial === null) {
                this._equirectMaterial = _getEquirectMaterial();
            }
        }
        const material = isCubeTexture ? this._cubemapMaterial : this._equirectMaterial;
        const mesh = new Mesh(this._lodPlanes[0], material);
        const uniforms = material.uniforms;
        uniforms['envMap'].value = texture;
        const size = this._cubeSize;
        _setViewport(cubeUVRenderTarget, 0, 0, 3 * size, 2 * size);
        renderer.setRenderTarget(cubeUVRenderTarget);
        renderer.render(mesh, _flatCamera);
    }
    _applyPMREM(cubeUVRenderTarget) {
        const renderer = this._renderer;
        const autoClear = renderer.autoClear;
        renderer.autoClear = false;
        for(let i = 1; i < this._lodPlanes.length; i++){
            const sigma = Math.sqrt(this._sigmas[i] * this._sigmas[i] - this._sigmas[i - 1] * this._sigmas[i - 1]);
            const poleAxis = _axisDirections[(i - 1) % _axisDirections.length];
            this._blur(cubeUVRenderTarget, i - 1, i, sigma, poleAxis);
        }
        renderer.autoClear = autoClear;
    }
    _blur(cubeUVRenderTarget, lodIn, lodOut, sigma, poleAxis) {
        const pingPongRenderTarget = this._pingPongRenderTarget;
        this._halfBlur(cubeUVRenderTarget, pingPongRenderTarget, lodIn, lodOut, sigma, 'latitudinal', poleAxis);
        this._halfBlur(pingPongRenderTarget, cubeUVRenderTarget, lodOut, lodOut, sigma, 'longitudinal', poleAxis);
    }
    _halfBlur(targetIn, targetOut, lodIn, lodOut, sigmaRadians, direction, poleAxis) {
        const renderer = this._renderer;
        const blurMaterial = this._blurMaterial;
        if (direction !== 'latitudinal' && direction !== 'longitudinal') {
            console.error('blur direction must be either latitudinal or longitudinal!');
        }
        const blurMesh = new Mesh(this._lodPlanes[lodOut], blurMaterial);
        const blurUniforms = blurMaterial.uniforms;
        const pixels = this._sizeLods[lodIn] - 1;
        const radiansPerPixel = isFinite(sigmaRadians) ? Math.PI / (2 * pixels) : 2 * Math.PI / (2 * 20 - 1);
        const sigmaPixels = sigmaRadians / radiansPerPixel;
        const samples = isFinite(sigmaRadians) ? 1 + Math.floor(3 * sigmaPixels) : 20;
        if (samples > 20) {
            console.warn(`sigmaRadians, ${sigmaRadians}, is too large and will clip, as it requested ${samples} samples when the maximum is set to ${20}`);
        }
        const weights = [];
        let sum = 0;
        for(let i = 0; i < 20; ++i){
            const x = i / sigmaPixels;
            const weight = Math.exp(-x * x / 2);
            weights.push(weight);
            if (i === 0) {
                sum += weight;
            } else if (i < samples) {
                sum += 2 * weight;
            }
        }
        for(let i1 = 0; i1 < weights.length; i1++){
            weights[i1] = weights[i1] / sum;
        }
        blurUniforms['envMap'].value = targetIn.texture;
        blurUniforms['samples'].value = samples;
        blurUniforms['weights'].value = weights;
        blurUniforms['latitudinal'].value = direction === 'latitudinal';
        if (poleAxis) {
            blurUniforms['poleAxis'].value = poleAxis;
        }
        const { _lodMax  } = this;
        blurUniforms['dTheta'].value = radiansPerPixel;
        blurUniforms['mipInt'].value = _lodMax - lodIn;
        const outputSize = this._sizeLods[lodOut];
        const x1 = 3 * outputSize * (lodOut > _lodMax - 4 ? lodOut - _lodMax + 4 : 0);
        const y = 4 * (this._cubeSize - outputSize);
        _setViewport(targetOut, x1, y, 3 * outputSize, 2 * outputSize);
        renderer.setRenderTarget(targetOut);
        renderer.render(blurMesh, _flatCamera);
    }
}
function _createPlanes(lodMax) {
    const lodPlanes = [];
    const sizeLods = [];
    const sigmas = [];
    let lod = lodMax;
    const totalLods = lodMax - 4 + 1 + EXTRA_LOD_SIGMA.length;
    for(let i = 0; i < totalLods; i++){
        const sizeLod = Math.pow(2, lod);
        sizeLods.push(sizeLod);
        let sigma = 1.0 / sizeLod;
        if (i > lodMax - 4) {
            sigma = EXTRA_LOD_SIGMA[i - lodMax + LOD_MIN - 1];
        } else if (i === 0) {
            sigma = 0;
        }
        sigmas.push(sigma);
        const texelSize = 1.0 / (sizeLod - 2);
        const min = -texelSize;
        const max = 1 + texelSize;
        const uv1 = [
            min,
            min,
            max,
            min,
            max,
            max,
            min,
            min,
            max,
            max,
            min,
            max
        ];
        const position = new Float32Array(3 * 6 * 6);
        const uv = new Float32Array(2 * 6 * 6);
        const faceIndex = new Float32Array(1 * 6 * 6);
        for(let face = 0; face < 6; face++){
            const x = face % 3 * 2 / 3 - 1;
            const y = face > 2 ? 0 : -1;
            const coordinates = [
                x,
                y,
                0,
                x + 2 / 3,
                y,
                0,
                x + 2 / 3,
                y + 1,
                0,
                x,
                y,
                0,
                x + 2 / 3,
                y + 1,
                0,
                x,
                y + 1,
                0
            ];
            position.set(coordinates, 3 * 6 * face);
            uv.set(uv1, 2 * 6 * face);
            const fill = [
                face,
                face,
                face,
                face,
                face,
                face
            ];
            faceIndex.set(fill, 1 * 6 * face);
        }
        const planes = new BufferGeometry();
        planes.setAttribute('position', new BufferAttribute(position, 3));
        planes.setAttribute('uv', new BufferAttribute(uv, 2));
        planes.setAttribute('faceIndex', new BufferAttribute(faceIndex, 1));
        lodPlanes.push(planes);
        if (lod > 4) {
            lod--;
        }
    }
    return {
        lodPlanes,
        sizeLods,
        sigmas
    };
}
function _createRenderTarget(width, height, params) {
    const cubeUVRenderTarget = new WebGLRenderTarget(width, height, params);
    cubeUVRenderTarget.texture.mapping = CubeUVReflectionMapping;
    cubeUVRenderTarget.texture.name = 'PMREM.cubeUv';
    cubeUVRenderTarget.scissorTest = true;
    return cubeUVRenderTarget;
}
function _setViewport(target, x, y, width, height) {
    target.viewport.set(x, y, width, height);
    target.scissor.set(x, y, width, height);
}
function _getBlurShader(lodMax, width, height) {
    const weights = new Float32Array(20);
    const poleAxis = new Vector3(0, 1, 0);
    const shaderMaterial = new ShaderMaterial({
        name: 'SphericalGaussianBlur',
        defines: {
            'n': 20,
            'CUBEUV_TEXEL_WIDTH': 1.0 / width,
            'CUBEUV_TEXEL_HEIGHT': 1.0 / height,
            'CUBEUV_MAX_MIP': `${lodMax}.0`
        },
        uniforms: {
            'envMap': {
                value: null
            },
            'samples': {
                value: 1
            },
            'weights': {
                value: weights
            },
            'latitudinal': {
                value: false
            },
            'dTheta': {
                value: 0
            },
            'mipInt': {
                value: 0
            },
            'poleAxis': {
                value: poleAxis
            }
        },
        vertexShader: _getCommonVertexShader(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
        blending: 0,
        depthTest: false,
        depthWrite: false
    });
    return shaderMaterial;
}
function _getEquirectMaterial() {
    return new ShaderMaterial({
        name: 'EquirectangularToCubeUV',
        uniforms: {
            'envMap': {
                value: null
            }
        },
        vertexShader: _getCommonVertexShader(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
        blending: 0,
        depthTest: false,
        depthWrite: false
    });
}
function _getCubemapMaterial() {
    return new ShaderMaterial({
        name: 'CubemapToCubeUV',
        uniforms: {
            'envMap': {
                value: null
            },
            'flipEnvMap': {
                value: -1
            }
        },
        vertexShader: _getCommonVertexShader(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
        blending: 0,
        depthTest: false,
        depthWrite: false
    });
}
function _getCommonVertexShader() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function WebGLCubeUVMaps(renderer) {
    let cubeUVmaps = new WeakMap();
    let pmremGenerator = null;
    function get(texture) {
        if (texture && texture.isTexture) {
            const mapping = texture.mapping;
            const isEquirectMap = mapping === 303 || mapping === 304;
            const isCubeMap = mapping === 301 || mapping === 302;
            if (isEquirectMap || isCubeMap) {
                if (texture.isRenderTargetTexture && texture.needsPMREMUpdate === true) {
                    texture.needsPMREMUpdate = false;
                    let renderTarget = cubeUVmaps.get(texture);
                    if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer);
                    renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture, renderTarget) : pmremGenerator.fromCubemap(texture, renderTarget);
                    cubeUVmaps.set(texture, renderTarget);
                    return renderTarget.texture;
                } else {
                    if (cubeUVmaps.has(texture)) {
                        return cubeUVmaps.get(texture).texture;
                    } else {
                        const image = texture.image;
                        if (isEquirectMap && image && image.height > 0 || isCubeMap && image && isCubeTextureComplete(image)) {
                            if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer);
                            const renderTarget1 = isEquirectMap ? pmremGenerator.fromEquirectangular(texture) : pmremGenerator.fromCubemap(texture);
                            cubeUVmaps.set(texture, renderTarget1);
                            texture.addEventListener('dispose', onTextureDispose);
                            return renderTarget1.texture;
                        } else {
                            return null;
                        }
                    }
                }
            }
        }
        return texture;
    }
    function isCubeTextureComplete(image) {
        let count = 0;
        for(let i = 0; i < 6; i++){
            if (image[i] !== undefined) count++;
        }
        return count === 6;
    }
    function onTextureDispose(event) {
        const texture = event.target;
        texture.removeEventListener('dispose', onTextureDispose);
        const cubemapUV = cubeUVmaps.get(texture);
        if (cubemapUV !== undefined) {
            cubeUVmaps.delete(texture);
            cubemapUV.dispose();
        }
    }
    function dispose() {
        cubeUVmaps = new WeakMap();
        if (pmremGenerator !== null) {
            pmremGenerator.dispose();
            pmremGenerator = null;
        }
    }
    return {
        get: get,
        dispose: dispose
    };
}
function WebGLExtensions(gl) {
    const extensions = {};
    function getExtension(name) {
        if (extensions[name] !== undefined) {
            return extensions[name];
        }
        let extension;
        switch(name){
            case 'WEBGL_depth_texture':
                extension = gl.getExtension('WEBGL_depth_texture') || gl.getExtension('MOZ_WEBGL_depth_texture') || gl.getExtension('WEBKIT_WEBGL_depth_texture');
                break;
            case 'EXT_texture_filter_anisotropic':
                extension = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
                break;
            case 'WEBGL_compressed_texture_s3tc':
                extension = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
                break;
            case 'WEBGL_compressed_texture_pvrtc':
                extension = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
                break;
            default:
                extension = gl.getExtension(name);
        }
        extensions[name] = extension;
        return extension;
    }
    return {
        has: function(name) {
            return getExtension(name) !== null;
        },
        init: function(capabilities) {
            if (capabilities.isWebGL2) {
                getExtension('EXT_color_buffer_float');
            } else {
                getExtension('WEBGL_depth_texture');
                getExtension('OES_texture_float');
                getExtension('OES_texture_half_float');
                getExtension('OES_texture_half_float_linear');
                getExtension('OES_standard_derivatives');
                getExtension('OES_element_index_uint');
                getExtension('OES_vertex_array_object');
                getExtension('ANGLE_instanced_arrays');
            }
            getExtension('OES_texture_float_linear');
            getExtension('EXT_color_buffer_half_float');
            getExtension('WEBGL_multisampled_render_to_texture');
        },
        get: function(name) {
            const extension = getExtension(name);
            if (extension === null) {
                console.warn('THREE.WebGLRenderer: ' + name + ' extension not supported.');
            }
            return extension;
        }
    };
}
function WebGLGeometries(gl, attributes, info, bindingStates) {
    const geometries = {};
    const wireframeAttributes = new WeakMap();
    function onGeometryDispose(event) {
        const geometry = event.target;
        if (geometry.index !== null) {
            attributes.remove(geometry.index);
        }
        for(const name in geometry.attributes){
            attributes.remove(geometry.attributes[name]);
        }
        geometry.removeEventListener('dispose', onGeometryDispose);
        delete geometries[geometry.id];
        const attribute = wireframeAttributes.get(geometry);
        if (attribute) {
            attributes.remove(attribute);
            wireframeAttributes.delete(geometry);
        }
        bindingStates.releaseStatesOfGeometry(geometry);
        if (geometry.isInstancedBufferGeometry === true) {
            delete geometry._maxInstanceCount;
        }
        info.memory.geometries--;
    }
    function get(object, geometry) {
        if (geometries[geometry.id] === true) return geometry;
        geometry.addEventListener('dispose', onGeometryDispose);
        geometries[geometry.id] = true;
        info.memory.geometries++;
        return geometry;
    }
    function update(geometry) {
        const geometryAttributes = geometry.attributes;
        for(const name in geometryAttributes){
            attributes.update(geometryAttributes[name], 34962);
        }
        const morphAttributes = geometry.morphAttributes;
        for(const name1 in morphAttributes){
            const array = morphAttributes[name1];
            for(let i = 0, l = array.length; i < l; i++){
                attributes.update(array[i], 34962);
            }
        }
    }
    function updateWireframeAttribute(geometry) {
        const indices = [];
        const geometryIndex = geometry.index;
        const geometryPosition = geometry.attributes.position;
        let version = 0;
        if (geometryIndex !== null) {
            const array = geometryIndex.array;
            version = geometryIndex.version;
            for(let i = 0, l = array.length; i < l; i += 3){
                const a = array[i + 0];
                const b = array[i + 1];
                const c = array[i + 2];
                indices.push(a, b, b, c, c, a);
            }
        } else {
            const array1 = geometryPosition.array;
            version = geometryPosition.version;
            for(let i1 = 0, l1 = array1.length / 3 - 1; i1 < l1; i1 += 3){
                const a1 = i1 + 0;
                const b1 = i1 + 1;
                const c1 = i1 + 2;
                indices.push(a1, b1, b1, c1, c1, a1);
            }
        }
        const attribute = new (arrayNeedsUint32(indices) ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);
        attribute.version = version;
        const previousAttribute = wireframeAttributes.get(geometry);
        if (previousAttribute) attributes.remove(previousAttribute);
        wireframeAttributes.set(geometry, attribute);
    }
    function getWireframeAttribute(geometry) {
        const currentAttribute = wireframeAttributes.get(geometry);
        if (currentAttribute) {
            const geometryIndex = geometry.index;
            if (geometryIndex !== null) {
                if (currentAttribute.version < geometryIndex.version) {
                    updateWireframeAttribute(geometry);
                }
            }
        } else {
            updateWireframeAttribute(geometry);
        }
        return wireframeAttributes.get(geometry);
    }
    return {
        get: get,
        update: update,
        getWireframeAttribute: getWireframeAttribute
    };
}
function WebGLIndexedBufferRenderer(gl, extensions, info, capabilities) {
    const isWebGL2 = capabilities.isWebGL2;
    let mode;
    function setMode(value) {
        mode = value;
    }
    let type, bytesPerElement;
    function setIndex(value) {
        type = value.type;
        bytesPerElement = value.bytesPerElement;
    }
    function render(start, count) {
        gl.drawElements(mode, count, type, start * bytesPerElement);
        info.update(count, mode, 1);
    }
    function renderInstances(start, count, primcount) {
        if (primcount === 0) return;
        let extension, methodName;
        if (isWebGL2) {
            extension = gl;
            methodName = 'drawElementsInstanced';
        } else {
            extension = extensions.get('ANGLE_instanced_arrays');
            methodName = 'drawElementsInstancedANGLE';
            if (extension === null) {
                console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                return;
            }
        }
        extension[methodName](mode, count, type, start * bytesPerElement, primcount);
        info.update(count, mode, primcount);
    }
    this.setMode = setMode;
    this.setIndex = setIndex;
    this.render = render;
    this.renderInstances = renderInstances;
}
function WebGLInfo(gl) {
    const memory = {
        geometries: 0,
        textures: 0
    };
    const render = {
        frame: 0,
        calls: 0,
        triangles: 0,
        points: 0,
        lines: 0
    };
    function update(count, mode, instanceCount) {
        render.calls++;
        switch(mode){
            case 4:
                render.triangles += instanceCount * (count / 3);
                break;
            case 1:
                render.lines += instanceCount * (count / 2);
                break;
            case 3:
                render.lines += instanceCount * (count - 1);
                break;
            case 2:
                render.lines += instanceCount * count;
                break;
            case 0:
                render.points += instanceCount * count;
                break;
            default:
                console.error('THREE.WebGLInfo: Unknown draw mode:', mode);
                break;
        }
    }
    function reset() {
        render.frame++;
        render.calls = 0;
        render.triangles = 0;
        render.points = 0;
        render.lines = 0;
    }
    return {
        memory: memory,
        render: render,
        programs: null,
        autoReset: true,
        reset: reset,
        update: update
    };
}
function numericalSort(a, b) {
    return a[0] - b[0];
}
function absNumericalSort(a, b) {
    return Math.abs(b[1]) - Math.abs(a[1]);
}
function WebGLMorphtargets(gl, capabilities, textures) {
    const influencesList = {};
    const morphInfluences = new Float32Array(8);
    const morphTextures = new WeakMap();
    const morph = new Vector4();
    const workInfluences = [];
    for(let i = 0; i < 8; i++){
        workInfluences[i] = [
            i,
            0
        ];
    }
    function update(object, geometry, program) {
        const objectInfluences = object.morphTargetInfluences;
        if (capabilities.isWebGL2 === true) {
            const morphAttribute = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color;
            const morphTargetsCount = morphAttribute !== undefined ? morphAttribute.length : 0;
            let entry = morphTextures.get(geometry);
            if (entry === undefined || entry.count !== morphTargetsCount) {
                if (entry !== undefined) entry.texture.dispose();
                const hasMorphPosition = geometry.morphAttributes.position !== undefined;
                const hasMorphNormals = geometry.morphAttributes.normal !== undefined;
                const hasMorphColors = geometry.morphAttributes.color !== undefined;
                const morphTargets = geometry.morphAttributes.position || [];
                const morphNormals = geometry.morphAttributes.normal || [];
                const morphColors = geometry.morphAttributes.color || [];
                let vertexDataCount = 0;
                if (hasMorphPosition === true) vertexDataCount = 1;
                if (hasMorphNormals === true) vertexDataCount = 2;
                if (hasMorphColors === true) vertexDataCount = 3;
                let width = geometry.attributes.position.count * vertexDataCount;
                let height = 1;
                if (width > capabilities.maxTextureSize) {
                    height = Math.ceil(width / capabilities.maxTextureSize);
                    width = capabilities.maxTextureSize;
                }
                const buffer = new Float32Array(width * height * 4 * morphTargetsCount);
                const texture = new DataArrayTexture(buffer, width, height, morphTargetsCount);
                texture.type = FloatType;
                texture.needsUpdate = true;
                const vertexDataStride = vertexDataCount * 4;
                for(let i = 0; i < morphTargetsCount; i++){
                    const morphTarget = morphTargets[i];
                    const morphNormal = morphNormals[i];
                    const morphColor = morphColors[i];
                    const offset = width * height * 4 * i;
                    for(let j = 0; j < morphTarget.count; j++){
                        const stride = j * vertexDataStride;
                        if (hasMorphPosition === true) {
                            morph.fromBufferAttribute(morphTarget, j);
                            buffer[offset + stride + 0] = morph.x;
                            buffer[offset + stride + 1] = morph.y;
                            buffer[offset + stride + 2] = morph.z;
                            buffer[offset + stride + 3] = 0;
                        }
                        if (hasMorphNormals === true) {
                            morph.fromBufferAttribute(morphNormal, j);
                            buffer[offset + stride + 4] = morph.x;
                            buffer[offset + stride + 5] = morph.y;
                            buffer[offset + stride + 6] = morph.z;
                            buffer[offset + stride + 7] = 0;
                        }
                        if (hasMorphColors === true) {
                            morph.fromBufferAttribute(morphColor, j);
                            buffer[offset + stride + 8] = morph.x;
                            buffer[offset + stride + 9] = morph.y;
                            buffer[offset + stride + 10] = morph.z;
                            buffer[offset + stride + 11] = morphColor.itemSize === 4 ? morph.w : 1;
                        }
                    }
                }
                entry = {
                    count: morphTargetsCount,
                    texture: texture,
                    size: new Vector2(width, height)
                };
                morphTextures.set(geometry, entry);
                function disposeTexture() {
                    texture.dispose();
                    morphTextures.delete(geometry);
                    geometry.removeEventListener('dispose', disposeTexture);
                }
                geometry.addEventListener('dispose', disposeTexture);
            }
            let morphInfluencesSum = 0;
            for(let i1 = 0; i1 < objectInfluences.length; i1++){
                morphInfluencesSum += objectInfluences[i1];
            }
            const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;
            program.getUniforms().setValue(gl, 'morphTargetBaseInfluence', morphBaseInfluence);
            program.getUniforms().setValue(gl, 'morphTargetInfluences', objectInfluences);
            program.getUniforms().setValue(gl, 'morphTargetsTexture', entry.texture, textures);
            program.getUniforms().setValue(gl, 'morphTargetsTextureSize', entry.size);
        } else {
            const length = objectInfluences === undefined ? 0 : objectInfluences.length;
            let influences = influencesList[geometry.id];
            if (influences === undefined || influences.length !== length) {
                influences = [];
                for(let i2 = 0; i2 < length; i2++){
                    influences[i2] = [
                        i2,
                        0
                    ];
                }
                influencesList[geometry.id] = influences;
            }
            for(let i3 = 0; i3 < length; i3++){
                const influence = influences[i3];
                influence[0] = i3;
                influence[1] = objectInfluences[i3];
            }
            influences.sort(absNumericalSort);
            for(let i4 = 0; i4 < 8; i4++){
                if (i4 < length && influences[i4][1]) {
                    workInfluences[i4][0] = influences[i4][0];
                    workInfluences[i4][1] = influences[i4][1];
                } else {
                    workInfluences[i4][0] = Number.MAX_SAFE_INTEGER;
                    workInfluences[i4][1] = 0;
                }
            }
            workInfluences.sort(numericalSort);
            const morphTargets1 = geometry.morphAttributes.position;
            const morphNormals1 = geometry.morphAttributes.normal;
            let morphInfluencesSum1 = 0;
            for(let i5 = 0; i5 < 8; i5++){
                const influence1 = workInfluences[i5];
                const index = influence1[0];
                const value = influence1[1];
                if (index !== Number.MAX_SAFE_INTEGER && value) {
                    if (morphTargets1 && geometry.getAttribute('morphTarget' + i5) !== morphTargets1[index]) {
                        geometry.setAttribute('morphTarget' + i5, morphTargets1[index]);
                    }
                    if (morphNormals1 && geometry.getAttribute('morphNormal' + i5) !== morphNormals1[index]) {
                        geometry.setAttribute('morphNormal' + i5, morphNormals1[index]);
                    }
                    morphInfluences[i5] = value;
                    morphInfluencesSum1 += value;
                } else {
                    if (morphTargets1 && geometry.hasAttribute('morphTarget' + i5) === true) {
                        geometry.deleteAttribute('morphTarget' + i5);
                    }
                    if (morphNormals1 && geometry.hasAttribute('morphNormal' + i5) === true) {
                        geometry.deleteAttribute('morphNormal' + i5);
                    }
                    morphInfluences[i5] = 0;
                }
            }
            const morphBaseInfluence1 = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum1;
            program.getUniforms().setValue(gl, 'morphTargetBaseInfluence', morphBaseInfluence1);
            program.getUniforms().setValue(gl, 'morphTargetInfluences', morphInfluences);
        }
    }
    return {
        update: update
    };
}
function WebGLObjects(gl, geometries, attributes, info) {
    let updateMap = new WeakMap();
    function update(object) {
        const frame = info.render.frame;
        const geometry = object.geometry;
        const buffergeometry = geometries.get(object, geometry);
        if (updateMap.get(buffergeometry) !== frame) {
            geometries.update(buffergeometry);
            updateMap.set(buffergeometry, frame);
        }
        if (object.isInstancedMesh) {
            if (object.hasEventListener('dispose', onInstancedMeshDispose) === false) {
                object.addEventListener('dispose', onInstancedMeshDispose);
            }
            attributes.update(object.instanceMatrix, 34962);
            if (object.instanceColor !== null) {
                attributes.update(object.instanceColor, 34962);
            }
        }
        return buffergeometry;
    }
    function dispose() {
        updateMap = new WeakMap();
    }
    function onInstancedMeshDispose(event) {
        const instancedMesh = event.target;
        instancedMesh.removeEventListener('dispose', onInstancedMeshDispose);
        attributes.remove(instancedMesh.instanceMatrix);
        if (instancedMesh.instanceColor !== null) attributes.remove(instancedMesh.instanceColor);
    }
    return {
        update: update,
        dispose: dispose
    };
}
const emptyTexture = new Texture();
const emptyArrayTexture = new DataArrayTexture();
const empty3dTexture = new Data3DTexture();
const emptyCubeTexture = new CubeTexture();
const arrayCacheF32 = [];
const arrayCacheI32 = [];
const mat4array = new Float32Array(16);
const mat3array = new Float32Array(9);
const mat2array = new Float32Array(4);
function flatten(array, nBlocks, blockSize) {
    const firstElem = array[0];
    if (firstElem <= 0 || firstElem > 0) return array;
    const n = nBlocks * blockSize;
    let r = arrayCacheF32[n];
    if (r === undefined) {
        r = new Float32Array(n);
        arrayCacheF32[n] = r;
    }
    if (nBlocks !== 0) {
        firstElem.toArray(r, 0);
        for(let i = 1, offset = 0; i !== nBlocks; ++i){
            offset += blockSize;
            array[i].toArray(r, offset);
        }
    }
    return r;
}
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0, l = a.length; i < l; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function copyArray(a, b) {
    for(let i = 0, l = b.length; i < l; i++){
        a[i] = b[i];
    }
}
function allocTexUnits(textures, n) {
    let r = arrayCacheI32[n];
    if (r === undefined) {
        r = new Int32Array(n);
        arrayCacheI32[n] = r;
    }
    for(let i = 0; i !== n; ++i){
        r[i] = textures.allocateTextureUnit();
    }
    return r;
}
function setValueV1f(gl, v) {
    const cache = this.cache;
    if (cache[0] === v) return;
    gl.uniform1f(this.addr, v);
    cache[0] = v;
}
function setValueV2f(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y) {
            gl.uniform2f(this.addr, v.x, v.y);
            cache[0] = v.x;
            cache[1] = v.y;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform2fv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV3f(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
            gl.uniform3f(this.addr, v.x, v.y, v.z);
            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
        }
    } else if (v.r !== undefined) {
        if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
            gl.uniform3f(this.addr, v.r, v.g, v.b);
            cache[0] = v.r;
            cache[1] = v.g;
            cache[2] = v.b;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform3fv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV4f(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
            gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
            cache[3] = v.w;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform4fv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueM2(gl, v) {
    const cache = this.cache;
    const elements = v.elements;
    if (elements === undefined) {
        if (arraysEqual(cache, v)) return;
        gl.uniformMatrix2fv(this.addr, false, v);
        copyArray(cache, v);
    } else {
        if (arraysEqual(cache, elements)) return;
        mat2array.set(elements);
        gl.uniformMatrix2fv(this.addr, false, mat2array);
        copyArray(cache, elements);
    }
}
function setValueM3(gl, v) {
    const cache = this.cache;
    const elements = v.elements;
    if (elements === undefined) {
        if (arraysEqual(cache, v)) return;
        gl.uniformMatrix3fv(this.addr, false, v);
        copyArray(cache, v);
    } else {
        if (arraysEqual(cache, elements)) return;
        mat3array.set(elements);
        gl.uniformMatrix3fv(this.addr, false, mat3array);
        copyArray(cache, elements);
    }
}
function setValueM4(gl, v) {
    const cache = this.cache;
    const elements = v.elements;
    if (elements === undefined) {
        if (arraysEqual(cache, v)) return;
        gl.uniformMatrix4fv(this.addr, false, v);
        copyArray(cache, v);
    } else {
        if (arraysEqual(cache, elements)) return;
        mat4array.set(elements);
        gl.uniformMatrix4fv(this.addr, false, mat4array);
        copyArray(cache, elements);
    }
}
function setValueV1i(gl, v) {
    const cache = this.cache;
    if (cache[0] === v) return;
    gl.uniform1i(this.addr, v);
    cache[0] = v;
}
function setValueV2i(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y) {
            gl.uniform2i(this.addr, v.x, v.y);
            cache[0] = v.x;
            cache[1] = v.y;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform2iv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV3i(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
            gl.uniform3i(this.addr, v.x, v.y, v.z);
            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform3iv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV4i(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
            gl.uniform4i(this.addr, v.x, v.y, v.z, v.w);
            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
            cache[3] = v.w;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform4iv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV1ui(gl, v) {
    const cache = this.cache;
    if (cache[0] === v) return;
    gl.uniform1ui(this.addr, v);
    cache[0] = v;
}
function setValueV2ui(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y) {
            gl.uniform2ui(this.addr, v.x, v.y);
            cache[0] = v.x;
            cache[1] = v.y;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform2uiv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV3ui(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
            gl.uniform3ui(this.addr, v.x, v.y, v.z);
            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform3uiv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueV4ui(gl, v) {
    const cache = this.cache;
    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
            gl.uniform4ui(this.addr, v.x, v.y, v.z, v.w);
            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
            cache[3] = v.w;
        }
    } else {
        if (arraysEqual(cache, v)) return;
        gl.uniform4uiv(this.addr, v);
        copyArray(cache, v);
    }
}
function setValueT1(gl, v, textures) {
    const cache = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache[0] !== unit) {
        gl.uniform1i(this.addr, unit);
        cache[0] = unit;
    }
    textures.setTexture2D(v || emptyTexture, unit);
}
function setValueT3D1(gl, v, textures) {
    const cache = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache[0] !== unit) {
        gl.uniform1i(this.addr, unit);
        cache[0] = unit;
    }
    textures.setTexture3D(v || empty3dTexture, unit);
}
function setValueT6(gl, v, textures) {
    const cache = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache[0] !== unit) {
        gl.uniform1i(this.addr, unit);
        cache[0] = unit;
    }
    textures.setTextureCube(v || emptyCubeTexture, unit);
}
function setValueT2DArray1(gl, v, textures) {
    const cache = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache[0] !== unit) {
        gl.uniform1i(this.addr, unit);
        cache[0] = unit;
    }
    textures.setTexture2DArray(v || emptyArrayTexture, unit);
}
function getSingularSetter(type) {
    switch(type){
        case 0x1406:
            return setValueV1f;
        case 0x8b50:
            return setValueV2f;
        case 0x8b51:
            return setValueV3f;
        case 0x8b52:
            return setValueV4f;
        case 0x8b5a:
            return setValueM2;
        case 0x8b5b:
            return setValueM3;
        case 0x8b5c:
            return setValueM4;
        case 0x1404:
        case 0x8b56:
            return setValueV1i;
        case 0x8b53:
        case 0x8b57:
            return setValueV2i;
        case 0x8b54:
        case 0x8b58:
            return setValueV3i;
        case 0x8b55:
        case 0x8b59:
            return setValueV4i;
        case 0x1405:
            return setValueV1ui;
        case 0x8dc6:
            return setValueV2ui;
        case 0x8dc7:
            return setValueV3ui;
        case 0x8dc8:
            return setValueV4ui;
        case 0x8b5e:
        case 0x8d66:
        case 0x8dca:
        case 0x8dd2:
        case 0x8b62:
            return setValueT1;
        case 0x8b5f:
        case 0x8dcb:
        case 0x8dd3:
            return setValueT3D1;
        case 0x8b60:
        case 0x8dcc:
        case 0x8dd4:
        case 0x8dc5:
            return setValueT6;
        case 0x8dc1:
        case 0x8dcf:
        case 0x8dd7:
        case 0x8dc4:
            return setValueT2DArray1;
    }
}
function setValueV1fArray(gl, v) {
    gl.uniform1fv(this.addr, v);
}
function setValueV2fArray(gl, v) {
    const data = flatten(v, this.size, 2);
    gl.uniform2fv(this.addr, data);
}
function setValueV3fArray(gl, v) {
    const data = flatten(v, this.size, 3);
    gl.uniform3fv(this.addr, data);
}
function setValueV4fArray(gl, v) {
    const data = flatten(v, this.size, 4);
    gl.uniform4fv(this.addr, data);
}
function setValueM2Array(gl, v) {
    const data = flatten(v, this.size, 4);
    gl.uniformMatrix2fv(this.addr, false, data);
}
function setValueM3Array(gl, v) {
    const data = flatten(v, this.size, 9);
    gl.uniformMatrix3fv(this.addr, false, data);
}
function setValueM4Array(gl, v) {
    const data = flatten(v, this.size, 16);
    gl.uniformMatrix4fv(this.addr, false, data);
}
function setValueV1iArray(gl, v) {
    gl.uniform1iv(this.addr, v);
}
function setValueV2iArray(gl, v) {
    gl.uniform2iv(this.addr, v);
}
function setValueV3iArray(gl, v) {
    gl.uniform3iv(this.addr, v);
}
function setValueV4iArray(gl, v) {
    gl.uniform4iv(this.addr, v);
}
function setValueV1uiArray(gl, v) {
    gl.uniform1uiv(this.addr, v);
}
function setValueV2uiArray(gl, v) {
    gl.uniform2uiv(this.addr, v);
}
function setValueV3uiArray(gl, v) {
    gl.uniform3uiv(this.addr, v);
}
function setValueV4uiArray(gl, v) {
    gl.uniform4uiv(this.addr, v);
}
function setValueT1Array(gl, v, textures) {
    const cache = this.cache;
    const n = v.length;
    const units = allocTexUnits(textures, n);
    if (!arraysEqual(cache, units)) {
        gl.uniform1iv(this.addr, units);
        copyArray(cache, units);
    }
    for(let i = 0; i !== n; ++i){
        textures.setTexture2D(v[i] || emptyTexture, units[i]);
    }
}
function setValueT3DArray(gl, v, textures) {
    const cache = this.cache;
    const n = v.length;
    const units = allocTexUnits(textures, n);
    if (!arraysEqual(cache, units)) {
        gl.uniform1iv(this.addr, units);
        copyArray(cache, units);
    }
    for(let i = 0; i !== n; ++i){
        textures.setTexture3D(v[i] || empty3dTexture, units[i]);
    }
}
function setValueT6Array(gl, v, textures) {
    const cache = this.cache;
    const n = v.length;
    const units = allocTexUnits(textures, n);
    if (!arraysEqual(cache, units)) {
        gl.uniform1iv(this.addr, units);
        copyArray(cache, units);
    }
    for(let i = 0; i !== n; ++i){
        textures.setTextureCube(v[i] || emptyCubeTexture, units[i]);
    }
}
function setValueT2DArrayArray(gl, v, textures) {
    const cache = this.cache;
    const n = v.length;
    const units = allocTexUnits(textures, n);
    if (!arraysEqual(cache, units)) {
        gl.uniform1iv(this.addr, units);
        copyArray(cache, units);
    }
    for(let i = 0; i !== n; ++i){
        textures.setTexture2DArray(v[i] || emptyArrayTexture, units[i]);
    }
}
function getPureArraySetter(type) {
    switch(type){
        case 0x1406:
            return setValueV1fArray;
        case 0x8b50:
            return setValueV2fArray;
        case 0x8b51:
            return setValueV3fArray;
        case 0x8b52:
            return setValueV4fArray;
        case 0x8b5a:
            return setValueM2Array;
        case 0x8b5b:
            return setValueM3Array;
        case 0x8b5c:
            return setValueM4Array;
        case 0x1404:
        case 0x8b56:
            return setValueV1iArray;
        case 0x8b53:
        case 0x8b57:
            return setValueV2iArray;
        case 0x8b54:
        case 0x8b58:
            return setValueV3iArray;
        case 0x8b55:
        case 0x8b59:
            return setValueV4iArray;
        case 0x1405:
            return setValueV1uiArray;
        case 0x8dc6:
            return setValueV2uiArray;
        case 0x8dc7:
            return setValueV3uiArray;
        case 0x8dc8:
            return setValueV4uiArray;
        case 0x8b5e:
        case 0x8d66:
        case 0x8dca:
        case 0x8dd2:
        case 0x8b62:
            return setValueT1Array;
        case 0x8b5f:
        case 0x8dcb:
        case 0x8dd3:
            return setValueT3DArray;
        case 0x8b60:
        case 0x8dcc:
        case 0x8dd4:
        case 0x8dc5:
            return setValueT6Array;
        case 0x8dc1:
        case 0x8dcf:
        case 0x8dd7:
        case 0x8dc4:
            return setValueT2DArrayArray;
    }
}
class SingleUniform {
    constructor(id, activeInfo, addr){
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.setValue = getSingularSetter(activeInfo.type);
    }
}
class PureArrayUniform {
    constructor(id, activeInfo, addr){
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.size = activeInfo.size;
        this.setValue = getPureArraySetter(activeInfo.type);
    }
}
class StructuredUniform {
    constructor(id){
        this.id = id;
        this.seq = [];
        this.map = {};
    }
    setValue(gl, value, textures) {
        const seq = this.seq;
        for(let i = 0, n = seq.length; i !== n; ++i){
            const u = seq[i];
            u.setValue(gl, value[u.id], textures);
        }
    }
}
const RePathPart = /(\w+)(\])?(\[|\.)?/g;
function addUniform(container, uniformObject) {
    container.seq.push(uniformObject);
    container.map[uniformObject.id] = uniformObject;
}
function parseUniform(activeInfo, addr, container) {
    const path = activeInfo.name, pathLength = path.length;
    RePathPart.lastIndex = 0;
    while(true){
        const match = RePathPart.exec(path), matchEnd = RePathPart.lastIndex;
        let id = match[1];
        const idIsIndex = match[2] === ']', subscript = match[3];
        if (idIsIndex) id = id | 0;
        if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {
            addUniform(container, subscript === undefined ? new SingleUniform(id, activeInfo, addr) : new PureArrayUniform(id, activeInfo, addr));
            break;
        } else {
            const map = container.map;
            let next = map[id];
            if (next === undefined) {
                next = new StructuredUniform(id);
                addUniform(container, next);
            }
            container = next;
        }
    }
}
class WebGLUniforms {
    constructor(gl, program){
        this.seq = [];
        this.map = {};
        const n = gl.getProgramParameter(program, 35718);
        for(let i = 0; i < n; ++i){
            const info = gl.getActiveUniform(program, i), addr = gl.getUniformLocation(program, info.name);
            parseUniform(info, addr, this);
        }
    }
    setValue(gl, name, value, textures) {
        const u = this.map[name];
        if (u !== undefined) u.setValue(gl, value, textures);
    }
    setOptional(gl, object, name) {
        const v = object[name];
        if (v !== undefined) this.setValue(gl, name, v);
    }
    static upload(gl, seq, values, textures) {
        for(let i = 0, n = seq.length; i !== n; ++i){
            const u = seq[i], v = values[u.id];
            if (v.needsUpdate !== false) {
                u.setValue(gl, v.value, textures);
            }
        }
    }
    static seqWithValue(seq, values) {
        const r = [];
        for(let i = 0, n = seq.length; i !== n; ++i){
            const u = seq[i];
            if (u.id in values) r.push(u);
        }
        return r;
    }
}
function WebGLShader(gl, type, string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, string);
    gl.compileShader(shader);
    return shader;
}
let programIdCount = 0;
function handleSource(string, errorLine) {
    const lines = string.split('\n');
    const lines2 = [];
    const from = Math.max(errorLine - 6, 0);
    const to = Math.min(errorLine + 6, lines.length);
    for(let i = from; i < to; i++){
        const line = i + 1;
        lines2.push(`${line === errorLine ? '>' : ' '} ${line}: ${lines[i]}`);
    }
    return lines2.join('\n');
}
function getEncodingComponents(encoding) {
    switch(encoding){
        case 3000:
            return [
                'Linear',
                '( value )'
            ];
        case 3001:
            return [
                'sRGB',
                '( value )'
            ];
        default:
            console.warn('THREE.WebGLProgram: Unsupported encoding:', encoding);
            return [
                'Linear',
                '( value )'
            ];
    }
}
function getShaderErrors(gl, shader, type) {
    const status = gl.getShaderParameter(shader, 35713);
    const errors = gl.getShaderInfoLog(shader).trim();
    if (status && errors === '') return '';
    const errorMatches = /ERROR: 0:(\d+)/.exec(errors);
    if (errorMatches) {
        const errorLine = parseInt(errorMatches[1]);
        return type.toUpperCase() + '\n\n' + errors + '\n\n' + handleSource(gl.getShaderSource(shader), errorLine);
    } else {
        return errors;
    }
}
function getTexelEncodingFunction(functionName, encoding) {
    const components = getEncodingComponents(encoding);
    return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[0] + components[1] + '; }';
}
function getToneMappingFunction(functionName, toneMapping) {
    let toneMappingName;
    switch(toneMapping){
        case 1:
            toneMappingName = 'Linear';
            break;
        case 2:
            toneMappingName = 'Reinhard';
            break;
        case 3:
            toneMappingName = 'OptimizedCineon';
            break;
        case 4:
            toneMappingName = 'ACESFilmic';
            break;
        case 5:
            toneMappingName = 'Custom';
            break;
        default:
            console.warn('THREE.WebGLProgram: Unsupported toneMapping:', toneMapping);
            toneMappingName = 'Linear';
    }
    return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';
}
function generateExtensions(parameters) {
    const chunks = [
        parameters.extensionDerivatives || !!parameters.envMapCubeUVHeight || parameters.bumpMap || parameters.normalMapTangentSpace || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical' ? '#extension GL_OES_standard_derivatives : enable' : '',
        (parameters.extensionFragDepth || parameters.logarithmicDepthBuffer) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
        parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers ? '#extension GL_EXT_draw_buffers : require' : '',
        (parameters.extensionShaderTextureLOD || parameters.envMap || parameters.transmission) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''
    ];
    return chunks.filter(filterEmptyLine).join('\n');
}
function generateDefines(defines) {
    const chunks = [];
    for(const name in defines){
        const value = defines[name];
        if (value === false) continue;
        chunks.push('#define ' + name + ' ' + value);
    }
    return chunks.join('\n');
}
function fetchAttributeLocations(gl, program) {
    const attributes = {};
    const n = gl.getProgramParameter(program, 35721);
    for(let i = 0; i < n; i++){
        const info = gl.getActiveAttrib(program, i);
        const name = info.name;
        let locationSize = 1;
        if (info.type === 35674) locationSize = 2;
        if (info.type === 35675) locationSize = 3;
        if (info.type === 35676) locationSize = 4;
        attributes[name] = {
            type: info.type,
            location: gl.getAttribLocation(program, name),
            locationSize: locationSize
        };
    }
    return attributes;
}
function filterEmptyLine(string) {
    return string !== '';
}
function replaceLightNums(string, parameters) {
    const numSpotLightCoords = parameters.numSpotLightShadows + parameters.numSpotLightMaps - parameters.numSpotLightShadowsWithMaps;
    return string.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights).replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, parameters.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, numSpotLightCoords).replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights).replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, parameters.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows);
}
function replaceClippingPlaneNums(string, parameters) {
    return string.replace(/NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, parameters.numClippingPlanes - parameters.numClipIntersection);
}
const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(string) {
    return string.replace(includePattern, includeReplacer);
}
function includeReplacer(match, include) {
    const string = ShaderChunk[include];
    if (string === undefined) {
        throw new Error('Can not resolve #include <' + include + '>');
    }
    return resolveIncludes(string);
}
const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(string) {
    return string.replace(unrollLoopPattern, loopReplacer);
}
function loopReplacer(match, start, end, snippet) {
    let string = '';
    for(let i = parseInt(start); i < parseInt(end); i++){
        string += snippet.replace(/\[\s*i\s*\]/g, '[ ' + i + ' ]').replace(/UNROLLED_LOOP_INDEX/g, i);
    }
    return string;
}
function generatePrecision(parameters) {
    let precisionstring = 'precision ' + parameters.precision + ' float;\nprecision ' + parameters.precision + ' int;';
    if (parameters.precision === 'highp') {
        precisionstring += '\n#define HIGH_PRECISION';
    } else if (parameters.precision === 'mediump') {
        precisionstring += '\n#define MEDIUM_PRECISION';
    } else if (parameters.precision === 'lowp') {
        precisionstring += '\n#define LOW_PRECISION';
    }
    return precisionstring;
}
function generateShadowMapTypeDefine(parameters) {
    let shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';
    if (parameters.shadowMapType === 1) {
        shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';
    } else if (parameters.shadowMapType === 2) {
        shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';
    } else if (parameters.shadowMapType === 3) {
        shadowMapTypeDefine = 'SHADOWMAP_TYPE_VSM';
    }
    return shadowMapTypeDefine;
}
function generateEnvMapTypeDefine(parameters) {
    let envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
    if (parameters.envMap) {
        switch(parameters.envMapMode){
            case 301:
            case 302:
                envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
                break;
            case 306:
                envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
                break;
        }
    }
    return envMapTypeDefine;
}
function generateEnvMapModeDefine(parameters) {
    let envMapModeDefine = 'ENVMAP_MODE_REFLECTION';
    if (parameters.envMap) {
        switch(parameters.envMapMode){
            case 302:
                envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
                break;
        }
    }
    return envMapModeDefine;
}
function generateEnvMapBlendingDefine(parameters) {
    let envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';
    if (parameters.envMap) {
        switch(parameters.combine){
            case 0:
                envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
                break;
            case 1:
                envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
                break;
            case 2:
                envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
                break;
        }
    }
    return envMapBlendingDefine;
}
function generateCubeUVSize(parameters) {
    const imageHeight = parameters.envMapCubeUVHeight;
    if (imageHeight === null) return null;
    const maxMip = Math.log2(imageHeight) - 2;
    const texelHeight = 1.0 / imageHeight;
    const texelWidth = 1.0 / (3 * Math.max(Math.pow(2, maxMip), 7 * 16));
    return {
        texelWidth,
        texelHeight,
        maxMip
    };
}
function WebGLProgram(renderer, cacheKey, parameters, bindingStates) {
    const gl = renderer.getContext();
    const defines = parameters.defines;
    let vertexShader = parameters.vertexShader;
    let fragmentShader = parameters.fragmentShader;
    const shadowMapTypeDefine = generateShadowMapTypeDefine(parameters);
    const envMapTypeDefine = generateEnvMapTypeDefine(parameters);
    const envMapModeDefine = generateEnvMapModeDefine(parameters);
    const envMapBlendingDefine = generateEnvMapBlendingDefine(parameters);
    const envMapCubeUVSize = generateCubeUVSize(parameters);
    const customExtensions = parameters.isWebGL2 ? '' : generateExtensions(parameters);
    const customDefines = generateDefines(defines);
    const program = gl.createProgram();
    let prefixVertex, prefixFragment;
    let versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + '\n' : '';
    if (parameters.isRawShaderMaterial) {
        prefixVertex = [
            customDefines
        ].filter(filterEmptyLine).join('\n');
        if (prefixVertex.length > 0) {
            prefixVertex += '\n';
        }
        prefixFragment = [
            customExtensions,
            customDefines
        ].filter(filterEmptyLine).join('\n');
        if (prefixFragment.length > 0) {
            prefixFragment += '\n';
        }
    } else {
        prefixVertex = [
            generatePrecision(parameters),
            '#define SHADER_NAME ' + parameters.shaderName,
            customDefines,
            parameters.instancing ? '#define USE_INSTANCING' : '',
            parameters.instancingColor ? '#define USE_INSTANCING_COLOR' : '',
            parameters.useFog && parameters.fog ? '#define USE_FOG' : '',
            parameters.useFog && parameters.fogExp2 ? '#define FOG_EXP2' : '',
            parameters.map ? '#define USE_MAP' : '',
            parameters.envMap ? '#define USE_ENVMAP' : '',
            parameters.envMap ? '#define ' + envMapModeDefine : '',
            parameters.lightMap ? '#define USE_LIGHTMAP' : '',
            parameters.aoMap ? '#define USE_AOMAP' : '',
            parameters.bumpMap ? '#define USE_BUMPMAP' : '',
            parameters.normalMap ? '#define USE_NORMALMAP' : '',
            parameters.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
            parameters.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
            parameters.displacementMap ? '#define USE_DISPLACEMENTMAP' : '',
            parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
            parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
            parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
            parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
            parameters.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
            parameters.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',
            parameters.specularMap ? '#define USE_SPECULARMAP' : '',
            parameters.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
            parameters.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',
            parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
            parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
            parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
            parameters.transmission ? '#define USE_TRANSMISSION' : '',
            parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
            parameters.thicknessMap ? '#define USE_THICKNESSMAP' : '',
            parameters.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
            parameters.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',
            parameters.mapUv ? '#define MAP_UV ' + parameters.mapUv : '',
            parameters.alphaMapUv ? '#define ALPHAMAP_UV ' + parameters.alphaMapUv : '',
            parameters.lightMapUv ? '#define LIGHTMAP_UV ' + parameters.lightMapUv : '',
            parameters.aoMapUv ? '#define AOMAP_UV ' + parameters.aoMapUv : '',
            parameters.emissiveMapUv ? '#define EMISSIVEMAP_UV ' + parameters.emissiveMapUv : '',
            parameters.bumpMapUv ? '#define BUMPMAP_UV ' + parameters.bumpMapUv : '',
            parameters.normalMapUv ? '#define NORMALMAP_UV ' + parameters.normalMapUv : '',
            parameters.displacementMapUv ? '#define DISPLACEMENTMAP_UV ' + parameters.displacementMapUv : '',
            parameters.metalnessMapUv ? '#define METALNESSMAP_UV ' + parameters.metalnessMapUv : '',
            parameters.roughnessMapUv ? '#define ROUGHNESSMAP_UV ' + parameters.roughnessMapUv : '',
            parameters.clearcoatMapUv ? '#define CLEARCOATMAP_UV ' + parameters.clearcoatMapUv : '',
            parameters.clearcoatNormalMapUv ? '#define CLEARCOAT_NORMALMAP_UV ' + parameters.clearcoatNormalMapUv : '',
            parameters.clearcoatRoughnessMapUv ? '#define CLEARCOAT_ROUGHNESSMAP_UV ' + parameters.clearcoatRoughnessMapUv : '',
            parameters.iridescenceMapUv ? '#define IRIDESCENCEMAP_UV ' + parameters.iridescenceMapUv : '',
            parameters.iridescenceThicknessMapUv ? '#define IRIDESCENCE_THICKNESSMAP_UV ' + parameters.iridescenceThicknessMapUv : '',
            parameters.sheenColorMapUv ? '#define SHEEN_COLORMAP_UV ' + parameters.sheenColorMapUv : '',
            parameters.sheenRoughnessMapUv ? '#define SHEEN_ROUGHNESSMAP_UV ' + parameters.sheenRoughnessMapUv : '',
            parameters.specularMapUv ? '#define SPECULARMAP_UV ' + parameters.specularMapUv : '',
            parameters.specularColorMapUv ? '#define SPECULAR_COLORMAP_UV ' + parameters.specularColorMapUv : '',
            parameters.specularIntensityMapUv ? '#define SPECULAR_INTENSITYMAP_UV ' + parameters.specularIntensityMapUv : '',
            parameters.transmissionMapUv ? '#define TRANSMISSIONMAP_UV ' + parameters.transmissionMapUv : '',
            parameters.thicknessMapUv ? '#define THICKNESSMAP_UV ' + parameters.thicknessMapUv : '',
            parameters.vertexTangents ? '#define USE_TANGENT' : '',
            parameters.vertexColors ? '#define USE_COLOR' : '',
            parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
            parameters.vertexUvs2 ? '#define USE_UV2' : '',
            parameters.pointsUvs ? '#define USE_POINTS_UV' : '',
            parameters.flatShading ? '#define FLAT_SHADED' : '',
            parameters.skinning ? '#define USE_SKINNING' : '',
            parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
            parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
            parameters.morphColors && parameters.isWebGL2 ? '#define USE_MORPHCOLORS' : '',
            parameters.morphTargetsCount > 0 && parameters.isWebGL2 ? '#define MORPHTARGETS_TEXTURE' : '',
            parameters.morphTargetsCount > 0 && parameters.isWebGL2 ? '#define MORPHTARGETS_TEXTURE_STRIDE ' + parameters.morphTextureStride : '',
            parameters.morphTargetsCount > 0 && parameters.isWebGL2 ? '#define MORPHTARGETS_COUNT ' + parameters.morphTargetsCount : '',
            parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
            parameters.flipSided ? '#define FLIP_SIDED' : '',
            parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
            parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',
            parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
            parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
            parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ? '#define USE_LOGDEPTHBUF_EXT' : '',
            'uniform mat4 modelMatrix;',
            'uniform mat4 modelViewMatrix;',
            'uniform mat4 projectionMatrix;',
            'uniform mat4 viewMatrix;',
            'uniform mat3 normalMatrix;',
            'uniform vec3 cameraPosition;',
            'uniform bool isOrthographic;',
            '#ifdef USE_INSTANCING',
            '	attribute mat4 instanceMatrix;',
            '#endif',
            '#ifdef USE_INSTANCING_COLOR',
            '	attribute vec3 instanceColor;',
            '#endif',
            'attribute vec3 position;',
            'attribute vec3 normal;',
            'attribute vec2 uv;',
            '#ifdef USE_TANGENT',
            '	attribute vec4 tangent;',
            '#endif',
            '#if defined( USE_COLOR_ALPHA )',
            '	attribute vec4 color;',
            '#elif defined( USE_COLOR )',
            '	attribute vec3 color;',
            '#endif',
            '#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )',
            '	attribute vec3 morphTarget0;',
            '	attribute vec3 morphTarget1;',
            '	attribute vec3 morphTarget2;',
            '	attribute vec3 morphTarget3;',
            '	#ifdef USE_MORPHNORMALS',
            '		attribute vec3 morphNormal0;',
            '		attribute vec3 morphNormal1;',
            '		attribute vec3 morphNormal2;',
            '		attribute vec3 morphNormal3;',
            '	#else',
            '		attribute vec3 morphTarget4;',
            '		attribute vec3 morphTarget5;',
            '		attribute vec3 morphTarget6;',
            '		attribute vec3 morphTarget7;',
            '	#endif',
            '#endif',
            '#ifdef USE_SKINNING',
            '	attribute vec4 skinIndex;',
            '	attribute vec4 skinWeight;',
            '#endif',
            '\n'
        ].filter(filterEmptyLine).join('\n');
        prefixFragment = [
            customExtensions,
            generatePrecision(parameters),
            '#define SHADER_NAME ' + parameters.shaderName,
            customDefines,
            parameters.useFog && parameters.fog ? '#define USE_FOG' : '',
            parameters.useFog && parameters.fogExp2 ? '#define FOG_EXP2' : '',
            parameters.map ? '#define USE_MAP' : '',
            parameters.matcap ? '#define USE_MATCAP' : '',
            parameters.envMap ? '#define USE_ENVMAP' : '',
            parameters.envMap ? '#define ' + envMapTypeDefine : '',
            parameters.envMap ? '#define ' + envMapModeDefine : '',
            parameters.envMap ? '#define ' + envMapBlendingDefine : '',
            envMapCubeUVSize ? '#define CUBEUV_TEXEL_WIDTH ' + envMapCubeUVSize.texelWidth : '',
            envMapCubeUVSize ? '#define CUBEUV_TEXEL_HEIGHT ' + envMapCubeUVSize.texelHeight : '',
            envMapCubeUVSize ? '#define CUBEUV_MAX_MIP ' + envMapCubeUVSize.maxMip + '.0' : '',
            parameters.lightMap ? '#define USE_LIGHTMAP' : '',
            parameters.aoMap ? '#define USE_AOMAP' : '',
            parameters.bumpMap ? '#define USE_BUMPMAP' : '',
            parameters.normalMap ? '#define USE_NORMALMAP' : '',
            parameters.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
            parameters.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
            parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
            parameters.clearcoat ? '#define USE_CLEARCOAT' : '',
            parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
            parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
            parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
            parameters.iridescence ? '#define USE_IRIDESCENCE' : '',
            parameters.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
            parameters.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',
            parameters.specularMap ? '#define USE_SPECULARMAP' : '',
            parameters.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
            parameters.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',
            parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
            parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
            parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
            parameters.alphaTest ? '#define USE_ALPHATEST' : '',
            parameters.sheen ? '#define USE_SHEEN' : '',
            parameters.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
            parameters.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',
            parameters.transmission ? '#define USE_TRANSMISSION' : '',
            parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
            parameters.thicknessMap ? '#define USE_THICKNESSMAP' : '',
            parameters.decodeVideoTexture ? '#define DECODE_VIDEO_TEXTURE' : '',
            parameters.vertexTangents ? '#define USE_TANGENT' : '',
            parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '',
            parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
            parameters.vertexUvs2 ? '#define USE_UV2' : '',
            parameters.pointsUvs ? '#define USE_POINTS_UV' : '',
            parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',
            parameters.flatShading ? '#define FLAT_SHADED' : '',
            parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
            parameters.flipSided ? '#define FLIP_SIDED' : '',
            parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
            parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',
            parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
            parameters.useLegacyLights ? '#define LEGACY_LIGHTS' : '',
            parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
            parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ? '#define USE_LOGDEPTHBUF_EXT' : '',
            'uniform mat4 viewMatrix;',
            'uniform vec3 cameraPosition;',
            'uniform bool isOrthographic;',
            parameters.toneMapping !== NoToneMapping ? '#define TONE_MAPPING' : '',
            parameters.toneMapping !== NoToneMapping ? ShaderChunk['tonemapping_pars_fragment'] : '',
            parameters.toneMapping !== NoToneMapping ? getToneMappingFunction('toneMapping', parameters.toneMapping) : '',
            parameters.dithering ? '#define DITHERING' : '',
            parameters.opaque ? '#define OPAQUE' : '',
            ShaderChunk['encodings_pars_fragment'],
            getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding),
            parameters.useDepthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '',
            '\n'
        ].filter(filterEmptyLine).join('\n');
    }
    vertexShader = resolveIncludes(vertexShader);
    vertexShader = replaceLightNums(vertexShader, parameters);
    vertexShader = replaceClippingPlaneNums(vertexShader, parameters);
    fragmentShader = resolveIncludes(fragmentShader);
    fragmentShader = replaceLightNums(fragmentShader, parameters);
    fragmentShader = replaceClippingPlaneNums(fragmentShader, parameters);
    vertexShader = unrollLoops(vertexShader);
    fragmentShader = unrollLoops(fragmentShader);
    if (parameters.isWebGL2 && parameters.isRawShaderMaterial !== true) {
        versionString = '#version 300 es\n';
        prefixVertex = [
            'precision mediump sampler2DArray;',
            '#define attribute in',
            '#define varying out',
            '#define texture2D texture'
        ].join('\n') + '\n' + prefixVertex;
        prefixFragment = [
            '#define varying in',
            parameters.glslVersion === GLSL3 ? '' : 'layout(location = 0) out highp vec4 pc_fragColor;',
            parameters.glslVersion === GLSL3 ? '' : '#define gl_FragColor pc_fragColor',
            '#define gl_FragDepthEXT gl_FragDepth',
            '#define texture2D texture',
            '#define textureCube texture',
            '#define texture2DProj textureProj',
            '#define texture2DLodEXT textureLod',
            '#define texture2DProjLodEXT textureProjLod',
            '#define textureCubeLodEXT textureLod',
            '#define texture2DGradEXT textureGrad',
            '#define texture2DProjGradEXT textureProjGrad',
            '#define textureCubeGradEXT textureGrad'
        ].join('\n') + '\n' + prefixFragment;
    }
    const vertexGlsl = versionString + prefixVertex + vertexShader;
    const fragmentGlsl = versionString + prefixFragment + fragmentShader;
    const glVertexShader = WebGLShader(gl, 35633, vertexGlsl);
    const glFragmentShader = WebGLShader(gl, 35632, fragmentGlsl);
    gl.attachShader(program, glVertexShader);
    gl.attachShader(program, glFragmentShader);
    if (parameters.index0AttributeName !== undefined) {
        gl.bindAttribLocation(program, 0, parameters.index0AttributeName);
    } else if (parameters.morphTargets === true) {
        gl.bindAttribLocation(program, 0, 'position');
    }
    gl.linkProgram(program);
    if (renderer.debug.checkShaderErrors) {
        const programLog = gl.getProgramInfoLog(program).trim();
        const vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
        const fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();
        let runnable = true;
        let haveDiagnostics = true;
        if (gl.getProgramParameter(program, 35714) === false) {
            runnable = false;
            if (typeof renderer.debug.onShaderError === 'function') {
                renderer.debug.onShaderError(gl, program, glVertexShader, glFragmentShader);
            } else {
                const vertexErrors = getShaderErrors(gl, glVertexShader, 'vertex');
                const fragmentErrors = getShaderErrors(gl, glFragmentShader, 'fragment');
                console.error('THREE.WebGLProgram: Shader Error ' + gl.getError() + ' - ' + 'VALIDATE_STATUS ' + gl.getProgramParameter(program, 35715) + '\n\n' + 'Program Info Log: ' + programLog + '\n' + vertexErrors + '\n' + fragmentErrors);
            }
        } else if (programLog !== '') {
            console.warn('THREE.WebGLProgram: Program Info Log:', programLog);
        } else if (vertexLog === '' || fragmentLog === '') {
            haveDiagnostics = false;
        }
        if (haveDiagnostics) {
            this.diagnostics = {
                runnable: runnable,
                programLog: programLog,
                vertexShader: {
                    log: vertexLog,
                    prefix: prefixVertex
                },
                fragmentShader: {
                    log: fragmentLog,
                    prefix: prefixFragment
                }
            };
        }
    }
    gl.deleteShader(glVertexShader);
    gl.deleteShader(glFragmentShader);
    let cachedUniforms;
    this.getUniforms = function() {
        if (cachedUniforms === undefined) {
            cachedUniforms = new WebGLUniforms(gl, program);
        }
        return cachedUniforms;
    };
    let cachedAttributes;
    this.getAttributes = function() {
        if (cachedAttributes === undefined) {
            cachedAttributes = fetchAttributeLocations(gl, program);
        }
        return cachedAttributes;
    };
    this.destroy = function() {
        bindingStates.releaseStatesOfProgram(this);
        gl.deleteProgram(program);
        this.program = undefined;
    };
    this.name = parameters.shaderName;
    this.id = programIdCount++;
    this.cacheKey = cacheKey;
    this.usedTimes = 1;
    this.program = program;
    this.vertexShader = glVertexShader;
    this.fragmentShader = glFragmentShader;
    return this;
}
let _id = 0;
class WebGLShaderCache {
    constructor(){
        this.shaderCache = new Map();
        this.materialCache = new Map();
    }
    update(material) {
        const vertexShader = material.vertexShader;
        const fragmentShader = material.fragmentShader;
        const vertexShaderStage = this._getShaderStage(vertexShader);
        const fragmentShaderStage = this._getShaderStage(fragmentShader);
        const materialShaders = this._getShaderCacheForMaterial(material);
        if (materialShaders.has(vertexShaderStage) === false) {
            materialShaders.add(vertexShaderStage);
            vertexShaderStage.usedTimes++;
        }
        if (materialShaders.has(fragmentShaderStage) === false) {
            materialShaders.add(fragmentShaderStage);
            fragmentShaderStage.usedTimes++;
        }
        return this;
    }
    remove(material) {
        const materialShaders = this.materialCache.get(material);
        for (const shaderStage of materialShaders){
            shaderStage.usedTimes--;
            if (shaderStage.usedTimes === 0) this.shaderCache.delete(shaderStage.code);
        }
        this.materialCache.delete(material);
        return this;
    }
    getVertexShaderID(material) {
        return this._getShaderStage(material.vertexShader).id;
    }
    getFragmentShaderID(material) {
        return this._getShaderStage(material.fragmentShader).id;
    }
    dispose() {
        this.shaderCache.clear();
        this.materialCache.clear();
    }
    _getShaderCacheForMaterial(material) {
        const cache = this.materialCache;
        let set = cache.get(material);
        if (set === undefined) {
            set = new Set();
            cache.set(material, set);
        }
        return set;
    }
    _getShaderStage(code) {
        const cache = this.shaderCache;
        let stage = cache.get(code);
        if (stage === undefined) {
            stage = new WebGLShaderStage(code);
            cache.set(code, stage);
        }
        return stage;
    }
}
class WebGLShaderStage {
    constructor(code){
        this.id = _id++;
        this.code = code;
        this.usedTimes = 0;
    }
}
function WebGLPrograms(renderer, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping) {
    const _programLayers = new Layers();
    const _customShaders = new WebGLShaderCache();
    const programs = [];
    const IS_WEBGL2 = capabilities.isWebGL2;
    const logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
    const SUPPORTS_VERTEX_TEXTURES = capabilities.vertexTextures;
    let precision = capabilities.precision;
    const shaderIDs = {
        MeshDepthMaterial: 'depth',
        MeshDistanceMaterial: 'distanceRGBA',
        MeshNormalMaterial: 'normal',
        MeshBasicMaterial: 'basic',
        MeshLambertMaterial: 'lambert',
        MeshPhongMaterial: 'phong',
        MeshToonMaterial: 'toon',
        MeshStandardMaterial: 'physical',
        MeshPhysicalMaterial: 'physical',
        MeshMatcapMaterial: 'matcap',
        LineBasicMaterial: 'basic',
        LineDashedMaterial: 'dashed',
        PointsMaterial: 'points',
        ShadowMaterial: 'shadow',
        SpriteMaterial: 'sprite'
    };
    function getChannel(value) {
        if (value === 1) return 'uv2';
        return 'uv';
    }
    function getParameters(material, lights, shadows, scene, object) {
        const fog = scene.fog;
        const geometry = object.geometry;
        const environment = material.isMeshStandardMaterial ? scene.environment : null;
        const envMap = (material.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material.envMap || environment);
        const envMapCubeUVHeight = !!envMap && envMap.mapping === 306 ? envMap.image.height : null;
        const shaderID = shaderIDs[material.type];
        if (material.precision !== null) {
            precision = capabilities.getMaxPrecision(material.precision);
            if (precision !== material.precision) {
                console.warn('THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');
            }
        }
        const morphAttribute = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color;
        const morphTargetsCount = morphAttribute !== undefined ? morphAttribute.length : 0;
        let morphTextureStride = 0;
        if (geometry.morphAttributes.position !== undefined) morphTextureStride = 1;
        if (geometry.morphAttributes.normal !== undefined) morphTextureStride = 2;
        if (geometry.morphAttributes.color !== undefined) morphTextureStride = 3;
        let vertexShader, fragmentShader;
        let customVertexShaderID, customFragmentShaderID;
        if (shaderID) {
            const shader = ShaderLib[shaderID];
            vertexShader = shader.vertexShader;
            fragmentShader = shader.fragmentShader;
        } else {
            vertexShader = material.vertexShader;
            fragmentShader = material.fragmentShader;
            _customShaders.update(material);
            customVertexShaderID = _customShaders.getVertexShaderID(material);
            customFragmentShaderID = _customShaders.getFragmentShaderID(material);
        }
        const currentRenderTarget = renderer.getRenderTarget();
        const IS_INSTANCEDMESH = object.isInstancedMesh === true;
        const HAS_MAP = !!material.map;
        const HAS_MATCAP = !!material.matcap;
        const HAS_ENVMAP = !!envMap;
        const HAS_AOMAP = !!material.aoMap;
        const HAS_LIGHTMAP = !!material.lightMap;
        const HAS_BUMPMAP = !!material.bumpMap;
        const HAS_NORMALMAP = !!material.normalMap;
        const HAS_DISPLACEMENTMAP = !!material.displacementMap;
        const HAS_EMISSIVEMAP = !!material.emissiveMap;
        const HAS_METALNESSMAP = !!material.metalnessMap;
        const HAS_ROUGHNESSMAP = !!material.roughnessMap;
        const HAS_CLEARCOAT = material.clearcoat > 0;
        const HAS_IRIDESCENCE = material.iridescence > 0;
        const HAS_SHEEN = material.sheen > 0;
        const HAS_TRANSMISSION = material.transmission > 0;
        const HAS_CLEARCOATMAP = HAS_CLEARCOAT && !!material.clearcoatMap;
        const HAS_CLEARCOAT_NORMALMAP = HAS_CLEARCOAT && !!material.clearcoatNormalMap;
        const HAS_CLEARCOAT_ROUGHNESSMAP = HAS_CLEARCOAT && !!material.clearcoatRoughnessMap;
        const HAS_IRIDESCENCEMAP = HAS_IRIDESCENCE && !!material.iridescenceMap;
        const HAS_IRIDESCENCE_THICKNESSMAP = HAS_IRIDESCENCE && !!material.iridescenceThicknessMap;
        const HAS_SHEEN_COLORMAP = HAS_SHEEN && !!material.sheenColorMap;
        const HAS_SHEEN_ROUGHNESSMAP = HAS_SHEEN && !!material.sheenRoughnessMap;
        const HAS_SPECULARMAP = !!material.specularMap;
        const HAS_SPECULAR_COLORMAP = !!material.specularColorMap;
        const HAS_SPECULAR_INTENSITYMAP = !!material.specularIntensityMap;
        const HAS_TRANSMISSIONMAP = HAS_TRANSMISSION && !!material.transmissionMap;
        const HAS_THICKNESSMAP = HAS_TRANSMISSION && !!material.thicknessMap;
        const HAS_GRADIENTMAP = !!material.gradientMap;
        const HAS_ALPHAMAP = !!material.alphaMap;
        const HAS_ALPHATEST = material.alphaTest > 0;
        const HAS_EXTENSIONS = !!material.extensions;
        const HAS_ATTRIBUTE_UV2 = !!geometry.attributes.uv2;
        const parameters = {
            isWebGL2: IS_WEBGL2,
            shaderID: shaderID,
            shaderName: material.type,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            defines: material.defines,
            customVertexShaderID: customVertexShaderID,
            customFragmentShaderID: customFragmentShaderID,
            isRawShaderMaterial: material.isRawShaderMaterial === true,
            glslVersion: material.glslVersion,
            precision: precision,
            instancing: IS_INSTANCEDMESH,
            instancingColor: IS_INSTANCEDMESH && object.instanceColor !== null,
            supportsVertexTextures: SUPPORTS_VERTEX_TEXTURES,
            outputEncoding: currentRenderTarget === null ? renderer.outputEncoding : currentRenderTarget.isXRRenderTarget === true ? currentRenderTarget.texture.encoding : 3000,
            map: HAS_MAP,
            matcap: HAS_MATCAP,
            envMap: HAS_ENVMAP,
            envMapMode: HAS_ENVMAP && envMap.mapping,
            envMapCubeUVHeight: envMapCubeUVHeight,
            aoMap: HAS_AOMAP,
            lightMap: HAS_LIGHTMAP,
            bumpMap: HAS_BUMPMAP,
            normalMap: HAS_NORMALMAP,
            displacementMap: SUPPORTS_VERTEX_TEXTURES && HAS_DISPLACEMENTMAP,
            emissiveMap: HAS_EMISSIVEMAP,
            normalMapObjectSpace: HAS_NORMALMAP && material.normalMapType === 1,
            normalMapTangentSpace: HAS_NORMALMAP && material.normalMapType === 0,
            decodeVideoTexture: HAS_MAP && material.map.isVideoTexture === true && material.map.encoding === 3001,
            metalnessMap: HAS_METALNESSMAP,
            roughnessMap: HAS_ROUGHNESSMAP,
            clearcoat: HAS_CLEARCOAT,
            clearcoatMap: HAS_CLEARCOATMAP,
            clearcoatNormalMap: HAS_CLEARCOAT_NORMALMAP,
            clearcoatRoughnessMap: HAS_CLEARCOAT_ROUGHNESSMAP,
            iridescence: HAS_IRIDESCENCE,
            iridescenceMap: HAS_IRIDESCENCEMAP,
            iridescenceThicknessMap: HAS_IRIDESCENCE_THICKNESSMAP,
            sheen: HAS_SHEEN,
            sheenColorMap: HAS_SHEEN_COLORMAP,
            sheenRoughnessMap: HAS_SHEEN_ROUGHNESSMAP,
            specularMap: HAS_SPECULARMAP,
            specularColorMap: HAS_SPECULAR_COLORMAP,
            specularIntensityMap: HAS_SPECULAR_INTENSITYMAP,
            transmission: HAS_TRANSMISSION,
            transmissionMap: HAS_TRANSMISSIONMAP,
            thicknessMap: HAS_THICKNESSMAP,
            gradientMap: HAS_GRADIENTMAP,
            opaque: material.transparent === false && material.blending === 1,
            alphaMap: HAS_ALPHAMAP,
            alphaTest: HAS_ALPHATEST,
            combine: material.combine,
            mapUv: HAS_MAP && getChannel(material.map.channel),
            aoMapUv: HAS_AOMAP && getChannel(material.aoMap.channel),
            lightMapUv: HAS_LIGHTMAP && getChannel(material.lightMap.channel),
            bumpMapUv: HAS_BUMPMAP && getChannel(material.bumpMap.channel),
            normalMapUv: HAS_NORMALMAP && getChannel(material.normalMap.channel),
            displacementMapUv: HAS_DISPLACEMENTMAP && getChannel(material.displacementMap.channel),
            emissiveMapUv: HAS_EMISSIVEMAP && getChannel(material.emissiveMap.channel),
            metalnessMapUv: HAS_METALNESSMAP && getChannel(material.metalnessMap.channel),
            roughnessMapUv: HAS_ROUGHNESSMAP && getChannel(material.roughnessMap.channel),
            clearcoatMapUv: HAS_CLEARCOATMAP && getChannel(material.clearcoatMap.channel),
            clearcoatNormalMapUv: HAS_CLEARCOAT_NORMALMAP && getChannel(material.clearcoatNormalMap.channel),
            clearcoatRoughnessMapUv: HAS_CLEARCOAT_ROUGHNESSMAP && getChannel(material.clearcoatRoughnessMap.channel),
            iridescenceMapUv: HAS_IRIDESCENCEMAP && getChannel(material.iridescenceMap.channel),
            iridescenceThicknessMapUv: HAS_IRIDESCENCE_THICKNESSMAP && getChannel(material.iridescenceThicknessMap.channel),
            sheenColorMapUv: HAS_SHEEN_COLORMAP && getChannel(material.sheenColorMap.channel),
            sheenRoughnessMapUv: HAS_SHEEN_ROUGHNESSMAP && getChannel(material.sheenRoughnessMap.channel),
            specularMapUv: HAS_SPECULARMAP && getChannel(material.specularMap.channel),
            specularColorMapUv: HAS_SPECULAR_COLORMAP && getChannel(material.specularColorMap.channel),
            specularIntensityMapUv: HAS_SPECULAR_INTENSITYMAP && getChannel(material.specularIntensityMap.channel),
            transmissionMapUv: HAS_TRANSMISSIONMAP && getChannel(material.transmissionMap.channel),
            thicknessMapUv: HAS_THICKNESSMAP && getChannel(material.thicknessMap.channel),
            alphaMapUv: HAS_ALPHAMAP && getChannel(material.alphaMap.channel),
            vertexTangents: HAS_NORMALMAP && !!geometry.attributes.tangent,
            vertexColors: material.vertexColors,
            vertexAlphas: material.vertexColors === true && !!geometry.attributes.color && geometry.attributes.color.itemSize === 4,
            vertexUvs2: HAS_ATTRIBUTE_UV2,
            pointsUvs: object.isPoints === true && !!geometry.attributes.uv && (HAS_MAP || HAS_ALPHAMAP),
            fog: !!fog,
            useFog: material.fog === true,
            fogExp2: fog && fog.isFogExp2,
            flatShading: material.flatShading === true,
            sizeAttenuation: material.sizeAttenuation === true,
            logarithmicDepthBuffer: logarithmicDepthBuffer,
            skinning: object.isSkinnedMesh === true,
            morphTargets: geometry.morphAttributes.position !== undefined,
            morphNormals: geometry.morphAttributes.normal !== undefined,
            morphColors: geometry.morphAttributes.color !== undefined,
            morphTargetsCount: morphTargetsCount,
            morphTextureStride: morphTextureStride,
            numDirLights: lights.directional.length,
            numPointLights: lights.point.length,
            numSpotLights: lights.spot.length,
            numSpotLightMaps: lights.spotLightMap.length,
            numRectAreaLights: lights.rectArea.length,
            numHemiLights: lights.hemi.length,
            numDirLightShadows: lights.directionalShadowMap.length,
            numPointLightShadows: lights.pointShadowMap.length,
            numSpotLightShadows: lights.spotShadowMap.length,
            numSpotLightShadowsWithMaps: lights.numSpotLightShadowsWithMaps,
            numClippingPlanes: clipping.numPlanes,
            numClipIntersection: clipping.numIntersection,
            dithering: material.dithering,
            shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
            shadowMapType: renderer.shadowMap.type,
            toneMapping: material.toneMapped ? renderer.toneMapping : 0,
            useLegacyLights: renderer.useLegacyLights,
            premultipliedAlpha: material.premultipliedAlpha,
            doubleSided: material.side === 2,
            flipSided: material.side === 1,
            useDepthPacking: material.depthPacking >= 0,
            depthPacking: material.depthPacking || 0,
            index0AttributeName: material.index0AttributeName,
            extensionDerivatives: HAS_EXTENSIONS && material.extensions.derivatives === true,
            extensionFragDepth: HAS_EXTENSIONS && material.extensions.fragDepth === true,
            extensionDrawBuffers: HAS_EXTENSIONS && material.extensions.drawBuffers === true,
            extensionShaderTextureLOD: HAS_EXTENSIONS && material.extensions.shaderTextureLOD === true,
            rendererExtensionFragDepth: IS_WEBGL2 || extensions.has('EXT_frag_depth'),
            rendererExtensionDrawBuffers: IS_WEBGL2 || extensions.has('WEBGL_draw_buffers'),
            rendererExtensionShaderTextureLod: IS_WEBGL2 || extensions.has('EXT_shader_texture_lod'),
            customProgramCacheKey: material.customProgramCacheKey()
        };
        return parameters;
    }
    function getProgramCacheKey(parameters) {
        const array = [];
        if (parameters.shaderID) {
            array.push(parameters.shaderID);
        } else {
            array.push(parameters.customVertexShaderID);
            array.push(parameters.customFragmentShaderID);
        }
        if (parameters.defines !== undefined) {
            for(const name in parameters.defines){
                array.push(name);
                array.push(parameters.defines[name]);
            }
        }
        if (parameters.isRawShaderMaterial === false) {
            getProgramCacheKeyParameters(array, parameters);
            getProgramCacheKeyBooleans(array, parameters);
            array.push(renderer.outputEncoding);
        }
        array.push(parameters.customProgramCacheKey);
        return array.join();
    }
    function getProgramCacheKeyParameters(array, parameters) {
        array.push(parameters.precision);
        array.push(parameters.outputEncoding);
        array.push(parameters.envMapMode);
        array.push(parameters.envMapCubeUVHeight);
        array.push(parameters.mapUv);
        array.push(parameters.alphaMapUv);
        array.push(parameters.lightMapUv);
        array.push(parameters.aoMapUv);
        array.push(parameters.bumpMapUv);
        array.push(parameters.normalMapUv);
        array.push(parameters.displacementMapUv);
        array.push(parameters.emissiveMapUv);
        array.push(parameters.metalnessMapUv);
        array.push(parameters.roughnessMapUv);
        array.push(parameters.clearcoatMapUv);
        array.push(parameters.clearcoatNormalMapUv);
        array.push(parameters.clearcoatRoughnessMapUv);
        array.push(parameters.iridescenceMapUv);
        array.push(parameters.iridescenceThicknessMapUv);
        array.push(parameters.sheenColorMapUv);
        array.push(parameters.sheenRoughnessMapUv);
        array.push(parameters.specularMapUv);
        array.push(parameters.specularColorMapUv);
        array.push(parameters.specularIntensityMapUv);
        array.push(parameters.transmissionMapUv);
        array.push(parameters.thicknessMapUv);
        array.push(parameters.combine);
        array.push(parameters.fogExp2);
        array.push(parameters.sizeAttenuation);
        array.push(parameters.morphTargetsCount);
        array.push(parameters.morphAttributeCount);
        array.push(parameters.numDirLights);
        array.push(parameters.numPointLights);
        array.push(parameters.numSpotLights);
        array.push(parameters.numSpotLightMaps);
        array.push(parameters.numHemiLights);
        array.push(parameters.numRectAreaLights);
        array.push(parameters.numDirLightShadows);
        array.push(parameters.numPointLightShadows);
        array.push(parameters.numSpotLightShadows);
        array.push(parameters.numSpotLightShadowsWithMaps);
        array.push(parameters.shadowMapType);
        array.push(parameters.toneMapping);
        array.push(parameters.numClippingPlanes);
        array.push(parameters.numClipIntersection);
        array.push(parameters.depthPacking);
    }
    function getProgramCacheKeyBooleans(array, parameters) {
        _programLayers.disableAll();
        if (parameters.isWebGL2) _programLayers.enable(0);
        if (parameters.supportsVertexTextures) _programLayers.enable(1);
        if (parameters.instancing) _programLayers.enable(2);
        if (parameters.instancingColor) _programLayers.enable(3);
        if (parameters.matcap) _programLayers.enable(4);
        if (parameters.envMap) _programLayers.enable(5);
        if (parameters.normalMapObjectSpace) _programLayers.enable(6);
        if (parameters.normalMapTangentSpace) _programLayers.enable(7);
        if (parameters.clearcoat) _programLayers.enable(8);
        if (parameters.iridescence) _programLayers.enable(9);
        if (parameters.alphaTest) _programLayers.enable(10);
        if (parameters.vertexColors) _programLayers.enable(11);
        if (parameters.vertexAlphas) _programLayers.enable(12);
        if (parameters.vertexUvs2) _programLayers.enable(13);
        if (parameters.vertexTangents) _programLayers.enable(14);
        array.push(_programLayers.mask);
        _programLayers.disableAll();
        if (parameters.fog) _programLayers.enable(0);
        if (parameters.useFog) _programLayers.enable(1);
        if (parameters.flatShading) _programLayers.enable(2);
        if (parameters.logarithmicDepthBuffer) _programLayers.enable(3);
        if (parameters.skinning) _programLayers.enable(4);
        if (parameters.morphTargets) _programLayers.enable(5);
        if (parameters.morphNormals) _programLayers.enable(6);
        if (parameters.morphColors) _programLayers.enable(7);
        if (parameters.premultipliedAlpha) _programLayers.enable(8);
        if (parameters.shadowMapEnabled) _programLayers.enable(9);
        if (parameters.useLegacyLights) _programLayers.enable(10);
        if (parameters.doubleSided) _programLayers.enable(11);
        if (parameters.flipSided) _programLayers.enable(12);
        if (parameters.useDepthPacking) _programLayers.enable(13);
        if (parameters.dithering) _programLayers.enable(14);
        if (parameters.transmission) _programLayers.enable(15);
        if (parameters.sheen) _programLayers.enable(16);
        if (parameters.decodeVideoTexture) _programLayers.enable(17);
        if (parameters.opaque) _programLayers.enable(18);
        if (parameters.pointsUvs) _programLayers.enable(19);
        array.push(_programLayers.mask);
    }
    function getUniforms(material) {
        const shaderID = shaderIDs[material.type];
        let uniforms;
        if (shaderID) {
            const shader = ShaderLib[shaderID];
            uniforms = UniformsUtils.clone(shader.uniforms);
        } else {
            uniforms = material.uniforms;
        }
        return uniforms;
    }
    function acquireProgram(parameters, cacheKey) {
        let program;
        for(let p = 0, pl = programs.length; p < pl; p++){
            const preexistingProgram = programs[p];
            if (preexistingProgram.cacheKey === cacheKey) {
                program = preexistingProgram;
                ++program.usedTimes;
                break;
            }
        }
        if (program === undefined) {
            program = new WebGLProgram(renderer, cacheKey, parameters, bindingStates);
            programs.push(program);
        }
        return program;
    }
    function releaseProgram(program) {
        if (--program.usedTimes === 0) {
            const i = programs.indexOf(program);
            programs[i] = programs[programs.length - 1];
            programs.pop();
            program.destroy();
        }
    }
    function releaseShaderCache(material) {
        _customShaders.remove(material);
    }
    function dispose() {
        _customShaders.dispose();
    }
    return {
        getParameters: getParameters,
        getProgramCacheKey: getProgramCacheKey,
        getUniforms: getUniforms,
        acquireProgram: acquireProgram,
        releaseProgram: releaseProgram,
        releaseShaderCache: releaseShaderCache,
        programs: programs,
        dispose: dispose
    };
}
function WebGLProperties() {
    let properties = new WeakMap();
    function get(object) {
        let map = properties.get(object);
        if (map === undefined) {
            map = {};
            properties.set(object, map);
        }
        return map;
    }
    function remove(object) {
        properties.delete(object);
    }
    function update(object, key, value) {
        properties.get(object)[key] = value;
    }
    function dispose() {
        properties = new WeakMap();
    }
    return {
        get: get,
        remove: remove,
        update: update,
        dispose: dispose
    };
}
function painterSortStable(a, b) {
    if (a.groupOrder !== b.groupOrder) {
        return a.groupOrder - b.groupOrder;
    } else if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
    } else if (a.material.id !== b.material.id) {
        return a.material.id - b.material.id;
    } else if (a.z !== b.z) {
        return a.z - b.z;
    } else {
        return a.id - b.id;
    }
}
function reversePainterSortStable(a, b) {
    if (a.groupOrder !== b.groupOrder) {
        return a.groupOrder - b.groupOrder;
    } else if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
    } else if (a.z !== b.z) {
        return b.z - a.z;
    } else {
        return a.id - b.id;
    }
}
function WebGLRenderList() {
    const renderItems = [];
    let renderItemsIndex = 0;
    const opaque = [];
    const transmissive = [];
    const transparent = [];
    function init() {
        renderItemsIndex = 0;
        opaque.length = 0;
        transmissive.length = 0;
        transparent.length = 0;
    }
    function getNextRenderItem(object, geometry, material, groupOrder, z, group) {
        let renderItem = renderItems[renderItemsIndex];
        if (renderItem === undefined) {
            renderItem = {
                id: object.id,
                object: object,
                geometry: geometry,
                material: material,
                groupOrder: groupOrder,
                renderOrder: object.renderOrder,
                z: z,
                group: group
            };
            renderItems[renderItemsIndex] = renderItem;
        } else {
            renderItem.id = object.id;
            renderItem.object = object;
            renderItem.geometry = geometry;
            renderItem.material = material;
            renderItem.groupOrder = groupOrder;
            renderItem.renderOrder = object.renderOrder;
            renderItem.z = z;
            renderItem.group = group;
        }
        renderItemsIndex++;
        return renderItem;
    }
    function push(object, geometry, material, groupOrder, z, group) {
        const renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);
        if (material.transmission > 0.0) {
            transmissive.push(renderItem);
        } else if (material.transparent === true) {
            transparent.push(renderItem);
        } else {
            opaque.push(renderItem);
        }
    }
    function unshift(object, geometry, material, groupOrder, z, group) {
        const renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);
        if (material.transmission > 0.0) {
            transmissive.unshift(renderItem);
        } else if (material.transparent === true) {
            transparent.unshift(renderItem);
        } else {
            opaque.unshift(renderItem);
        }
    }
    function sort(customOpaqueSort, customTransparentSort) {
        if (opaque.length > 1) opaque.sort(customOpaqueSort || painterSortStable);
        if (transmissive.length > 1) transmissive.sort(customTransparentSort || reversePainterSortStable);
        if (transparent.length > 1) transparent.sort(customTransparentSort || reversePainterSortStable);
    }
    function finish() {
        for(let i = renderItemsIndex, il = renderItems.length; i < il; i++){
            const renderItem = renderItems[i];
            if (renderItem.id === null) break;
            renderItem.id = null;
            renderItem.object = null;
            renderItem.geometry = null;
            renderItem.material = null;
            renderItem.group = null;
        }
    }
    return {
        opaque: opaque,
        transmissive: transmissive,
        transparent: transparent,
        init: init,
        push: push,
        unshift: unshift,
        finish: finish,
        sort: sort
    };
}
function WebGLRenderLists() {
    let lists = new WeakMap();
    function get(scene, renderCallDepth) {
        const listArray = lists.get(scene);
        let list;
        if (listArray === undefined) {
            list = new WebGLRenderList();
            lists.set(scene, [
                list
            ]);
        } else {
            if (renderCallDepth >= listArray.length) {
                list = new WebGLRenderList();
                listArray.push(list);
            } else {
                list = listArray[renderCallDepth];
            }
        }
        return list;
    }
    function dispose() {
        lists = new WeakMap();
    }
    return {
        get: get,
        dispose: dispose
    };
}
function UniformsCache() {
    const lights = {};
    return {
        get: function(light) {
            if (lights[light.id] !== undefined) {
                return lights[light.id];
            }
            let uniforms;
            switch(light.type){
                case 'DirectionalLight':
                    uniforms = {
                        direction: new Vector3(),
                        color: new Color()
                    };
                    break;
                case 'SpotLight':
                    uniforms = {
                        position: new Vector3(),
                        direction: new Vector3(),
                        color: new Color(),
                        distance: 0,
                        coneCos: 0,
                        penumbraCos: 0,
                        decay: 0
                    };
                    break;
                case 'PointLight':
                    uniforms = {
                        position: new Vector3(),
                        color: new Color(),
                        distance: 0,
                        decay: 0
                    };
                    break;
                case 'HemisphereLight':
                    uniforms = {
                        direction: new Vector3(),
                        skyColor: new Color(),
                        groundColor: new Color()
                    };
                    break;
                case 'RectAreaLight':
                    uniforms = {
                        color: new Color(),
                        position: new Vector3(),
                        halfWidth: new Vector3(),
                        halfHeight: new Vector3()
                    };
                    break;
            }
            lights[light.id] = uniforms;
            return uniforms;
        }
    };
}
function ShadowUniformsCache() {
    const lights = {};
    return {
        get: function(light) {
            if (lights[light.id] !== undefined) {
                return lights[light.id];
            }
            let uniforms;
            switch(light.type){
                case 'DirectionalLight':
                    uniforms = {
                        shadowBias: 0,
                        shadowNormalBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2()
                    };
                    break;
                case 'SpotLight':
                    uniforms = {
                        shadowBias: 0,
                        shadowNormalBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2()
                    };
                    break;
                case 'PointLight':
                    uniforms = {
                        shadowBias: 0,
                        shadowNormalBias: 0,
                        shadowRadius: 1,
                        shadowMapSize: new Vector2(),
                        shadowCameraNear: 1,
                        shadowCameraFar: 1000
                    };
                    break;
            }
            lights[light.id] = uniforms;
            return uniforms;
        }
    };
}
let nextVersion = 0;
function shadowCastingAndTexturingLightsFirst(lightA, lightB) {
    return (lightB.castShadow ? 2 : 0) - (lightA.castShadow ? 2 : 0) + (lightB.map ? 1 : 0) - (lightA.map ? 1 : 0);
}
function WebGLLights(extensions, capabilities) {
    const cache = new UniformsCache();
    const shadowCache = ShadowUniformsCache();
    const state = {
        version: 0,
        hash: {
            directionalLength: -1,
            pointLength: -1,
            spotLength: -1,
            rectAreaLength: -1,
            hemiLength: -1,
            numDirectionalShadows: -1,
            numPointShadows: -1,
            numSpotShadows: -1,
            numSpotMaps: -1
        },
        ambient: [
            0,
            0,
            0
        ],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotLightMap: [],
        spotShadow: [],
        spotShadowMap: [],
        spotLightMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
        numSpotLightShadowsWithMaps: 0
    };
    for(let i = 0; i < 9; i++)state.probe.push(new Vector3());
    const vector3 = new Vector3();
    const matrix4 = new Matrix4();
    const matrix42 = new Matrix4();
    function setup(lights, useLegacyLights) {
        let r = 0, g = 0, b = 0;
        for(let i = 0; i < 9; i++)state.probe[i].set(0, 0, 0);
        let directionalLength = 0;
        let pointLength = 0;
        let spotLength = 0;
        let rectAreaLength = 0;
        let hemiLength = 0;
        let numDirectionalShadows = 0;
        let numPointShadows = 0;
        let numSpotShadows = 0;
        let numSpotMaps = 0;
        let numSpotShadowsWithMaps = 0;
        lights.sort(shadowCastingAndTexturingLightsFirst);
        const scaleFactor = useLegacyLights === true ? Math.PI : 1;
        for(let i1 = 0, l = lights.length; i1 < l; i1++){
            const light = lights[i1];
            const color = light.color;
            const intensity = light.intensity;
            const distance = light.distance;
            const shadowMap = light.shadow && light.shadow.map ? light.shadow.map.texture : null;
            if (light.isAmbientLight) {
                r += color.r * intensity * scaleFactor;
                g += color.g * intensity * scaleFactor;
                b += color.b * intensity * scaleFactor;
            } else if (light.isLightProbe) {
                for(let j = 0; j < 9; j++){
                    state.probe[j].addScaledVector(light.sh.coefficients[j], intensity);
                }
            } else if (light.isDirectionalLight) {
                const uniforms = cache.get(light);
                uniforms.color.copy(light.color).multiplyScalar(light.intensity * scaleFactor);
                if (light.castShadow) {
                    const shadow = light.shadow;
                    const shadowUniforms = shadowCache.get(light);
                    shadowUniforms.shadowBias = shadow.bias;
                    shadowUniforms.shadowNormalBias = shadow.normalBias;
                    shadowUniforms.shadowRadius = shadow.radius;
                    shadowUniforms.shadowMapSize = shadow.mapSize;
                    state.directionalShadow[directionalLength] = shadowUniforms;
                    state.directionalShadowMap[directionalLength] = shadowMap;
                    state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
                    numDirectionalShadows++;
                }
                state.directional[directionalLength] = uniforms;
                directionalLength++;
            } else if (light.isSpotLight) {
                const uniforms1 = cache.get(light);
                uniforms1.position.setFromMatrixPosition(light.matrixWorld);
                uniforms1.color.copy(color).multiplyScalar(intensity * scaleFactor);
                uniforms1.distance = distance;
                uniforms1.coneCos = Math.cos(light.angle);
                uniforms1.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
                uniforms1.decay = light.decay;
                state.spot[spotLength] = uniforms1;
                const shadow1 = light.shadow;
                if (light.map) {
                    state.spotLightMap[numSpotMaps] = light.map;
                    numSpotMaps++;
                    shadow1.updateMatrices(light);
                    if (light.castShadow) numSpotShadowsWithMaps++;
                }
                state.spotLightMatrix[spotLength] = shadow1.matrix;
                if (light.castShadow) {
                    const shadowUniforms1 = shadowCache.get(light);
                    shadowUniforms1.shadowBias = shadow1.bias;
                    shadowUniforms1.shadowNormalBias = shadow1.normalBias;
                    shadowUniforms1.shadowRadius = shadow1.radius;
                    shadowUniforms1.shadowMapSize = shadow1.mapSize;
                    state.spotShadow[spotLength] = shadowUniforms1;
                    state.spotShadowMap[spotLength] = shadowMap;
                    numSpotShadows++;
                }
                spotLength++;
            } else if (light.isRectAreaLight) {
                const uniforms2 = cache.get(light);
                uniforms2.color.copy(color).multiplyScalar(intensity);
                uniforms2.halfWidth.set(light.width * 0.5, 0.0, 0.0);
                uniforms2.halfHeight.set(0.0, light.height * 0.5, 0.0);
                state.rectArea[rectAreaLength] = uniforms2;
                rectAreaLength++;
            } else if (light.isPointLight) {
                const uniforms3 = cache.get(light);
                uniforms3.color.copy(light.color).multiplyScalar(light.intensity * scaleFactor);
                uniforms3.distance = light.distance;
                uniforms3.decay = light.decay;
                if (light.castShadow) {
                    const shadow2 = light.shadow;
                    const shadowUniforms2 = shadowCache.get(light);
                    shadowUniforms2.shadowBias = shadow2.bias;
                    shadowUniforms2.shadowNormalBias = shadow2.normalBias;
                    shadowUniforms2.shadowRadius = shadow2.radius;
                    shadowUniforms2.shadowMapSize = shadow2.mapSize;
                    shadowUniforms2.shadowCameraNear = shadow2.camera.near;
                    shadowUniforms2.shadowCameraFar = shadow2.camera.far;
                    state.pointShadow[pointLength] = shadowUniforms2;
                    state.pointShadowMap[pointLength] = shadowMap;
                    state.pointShadowMatrix[pointLength] = light.shadow.matrix;
                    numPointShadows++;
                }
                state.point[pointLength] = uniforms3;
                pointLength++;
            } else if (light.isHemisphereLight) {
                const uniforms4 = cache.get(light);
                uniforms4.skyColor.copy(light.color).multiplyScalar(intensity * scaleFactor);
                uniforms4.groundColor.copy(light.groundColor).multiplyScalar(intensity * scaleFactor);
                state.hemi[hemiLength] = uniforms4;
                hemiLength++;
            }
        }
        if (rectAreaLength > 0) {
            if (capabilities.isWebGL2) {
                state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
                state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;
            } else {
                if (extensions.has('OES_texture_float_linear') === true) {
                    state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
                    state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;
                } else if (extensions.has('OES_texture_half_float_linear') === true) {
                    state.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
                    state.rectAreaLTC2 = UniformsLib.LTC_HALF_2;
                } else {
                    console.error('THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.');
                }
            }
        }
        state.ambient[0] = r;
        state.ambient[1] = g;
        state.ambient[2] = b;
        const hash = state.hash;
        if (hash.directionalLength !== directionalLength || hash.pointLength !== pointLength || hash.spotLength !== spotLength || hash.rectAreaLength !== rectAreaLength || hash.hemiLength !== hemiLength || hash.numDirectionalShadows !== numDirectionalShadows || hash.numPointShadows !== numPointShadows || hash.numSpotShadows !== numSpotShadows || hash.numSpotMaps !== numSpotMaps) {
            state.directional.length = directionalLength;
            state.spot.length = spotLength;
            state.rectArea.length = rectAreaLength;
            state.point.length = pointLength;
            state.hemi.length = hemiLength;
            state.directionalShadow.length = numDirectionalShadows;
            state.directionalShadowMap.length = numDirectionalShadows;
            state.pointShadow.length = numPointShadows;
            state.pointShadowMap.length = numPointShadows;
            state.spotShadow.length = numSpotShadows;
            state.spotShadowMap.length = numSpotShadows;
            state.directionalShadowMatrix.length = numDirectionalShadows;
            state.pointShadowMatrix.length = numPointShadows;
            state.spotLightMatrix.length = numSpotShadows + numSpotMaps - numSpotShadowsWithMaps;
            state.spotLightMap.length = numSpotMaps;
            state.numSpotLightShadowsWithMaps = numSpotShadowsWithMaps;
            hash.directionalLength = directionalLength;
            hash.pointLength = pointLength;
            hash.spotLength = spotLength;
            hash.rectAreaLength = rectAreaLength;
            hash.hemiLength = hemiLength;
            hash.numDirectionalShadows = numDirectionalShadows;
            hash.numPointShadows = numPointShadows;
            hash.numSpotShadows = numSpotShadows;
            hash.numSpotMaps = numSpotMaps;
            state.version = nextVersion++;
        }
    }
    function setupView(lights, camera) {
        let directionalLength = 0;
        let pointLength = 0;
        let spotLength = 0;
        let rectAreaLength = 0;
        let hemiLength = 0;
        const viewMatrix = camera.matrixWorldInverse;
        for(let i = 0, l = lights.length; i < l; i++){
            const light = lights[i];
            if (light.isDirectionalLight) {
                const uniforms = state.directional[directionalLength];
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);
                directionalLength++;
            } else if (light.isSpotLight) {
                const uniforms1 = state.spot[spotLength];
                uniforms1.position.setFromMatrixPosition(light.matrixWorld);
                uniforms1.position.applyMatrix4(viewMatrix);
                uniforms1.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms1.direction.sub(vector3);
                uniforms1.direction.transformDirection(viewMatrix);
                spotLength++;
            } else if (light.isRectAreaLight) {
                const uniforms2 = state.rectArea[rectAreaLength];
                uniforms2.position.setFromMatrixPosition(light.matrixWorld);
                uniforms2.position.applyMatrix4(viewMatrix);
                matrix42.identity();
                matrix4.copy(light.matrixWorld);
                matrix4.premultiply(viewMatrix);
                matrix42.extractRotation(matrix4);
                uniforms2.halfWidth.set(light.width * 0.5, 0.0, 0.0);
                uniforms2.halfHeight.set(0.0, light.height * 0.5, 0.0);
                uniforms2.halfWidth.applyMatrix4(matrix42);
                uniforms2.halfHeight.applyMatrix4(matrix42);
                rectAreaLength++;
            } else if (light.isPointLight) {
                const uniforms3 = state.point[pointLength];
                uniforms3.position.setFromMatrixPosition(light.matrixWorld);
                uniforms3.position.applyMatrix4(viewMatrix);
                pointLength++;
            } else if (light.isHemisphereLight) {
                const uniforms4 = state.hemi[hemiLength];
                uniforms4.direction.setFromMatrixPosition(light.matrixWorld);
                uniforms4.direction.transformDirection(viewMatrix);
                hemiLength++;
            }
        }
    }
    return {
        setup: setup,
        setupView: setupView,
        state: state
    };
}
function WebGLRenderState(extensions, capabilities) {
    const lights = new WebGLLights(extensions, capabilities);
    const lightsArray = [];
    const shadowsArray = [];
    function init() {
        lightsArray.length = 0;
        shadowsArray.length = 0;
    }
    function pushLight(light) {
        lightsArray.push(light);
    }
    function pushShadow(shadowLight) {
        shadowsArray.push(shadowLight);
    }
    function setupLights(useLegacyLights) {
        lights.setup(lightsArray, useLegacyLights);
    }
    function setupLightsView(camera) {
        lights.setupView(lightsArray, camera);
    }
    const state = {
        lightsArray: lightsArray,
        shadowsArray: shadowsArray,
        lights: lights
    };
    return {
        init: init,
        state: state,
        setupLights: setupLights,
        setupLightsView: setupLightsView,
        pushLight: pushLight,
        pushShadow: pushShadow
    };
}
function WebGLRenderStates(extensions, capabilities) {
    let renderStates = new WeakMap();
    function get(scene, renderCallDepth = 0) {
        const renderStateArray = renderStates.get(scene);
        let renderState;
        if (renderStateArray === undefined) {
            renderState = new WebGLRenderState(extensions, capabilities);
            renderStates.set(scene, [
                renderState
            ]);
        } else {
            if (renderCallDepth >= renderStateArray.length) {
                renderState = new WebGLRenderState(extensions, capabilities);
                renderStateArray.push(renderState);
            } else {
                renderState = renderStateArray[renderCallDepth];
            }
        }
        return renderState;
    }
    function dispose() {
        renderStates = new WeakMap();
    }
    return {
        get: get,
        dispose: dispose
    };
}
class MeshDepthMaterial extends Material {
    constructor(parameters){
        super();
        this.isMeshDepthMaterial = true;
        this.type = 'MeshDepthMaterial';
        this.depthPacking = BasicDepthPacking;
        this.map = null;
        this.alphaMap = null;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.depthPacking = source.depthPacking;
        this.map = source.map;
        this.alphaMap = source.alphaMap;
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        return this;
    }
}
class MeshDistanceMaterial extends Material {
    constructor(parameters){
        super();
        this.isMeshDistanceMaterial = true;
        this.type = 'MeshDistanceMaterial';
        this.map = null;
        this.alphaMap = null;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.map = source.map;
        this.alphaMap = source.alphaMap;
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        return this;
    }
}
const vertex = "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";
const fragment = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";
function WebGLShadowMap(_renderer, _objects, _capabilities) {
    let _frustum = new Frustum();
    const _shadowMapSize = new Vector2(), _viewportSize = new Vector2(), _viewport = new Vector4(), _depthMaterial = new MeshDepthMaterial({
        depthPacking: 3201
    }), _distanceMaterial = new MeshDistanceMaterial(), _materialCache = {}, _maxTextureSize = _capabilities.maxTextureSize;
    const shadowSide = {
        [0]: 1,
        [1]: 0,
        [2]: 2
    };
    const shadowMaterialVertical = new ShaderMaterial({
        defines: {
            VSM_SAMPLES: 8
        },
        uniforms: {
            shadow_pass: {
                value: null
            },
            resolution: {
                value: new Vector2()
            },
            radius: {
                value: 4.0
            }
        },
        vertexShader: vertex,
        fragmentShader: fragment
    });
    const shadowMaterialHorizontal = shadowMaterialVertical.clone();
    shadowMaterialHorizontal.defines.HORIZONTAL_PASS = 1;
    const fullScreenTri = new BufferGeometry();
    fullScreenTri.setAttribute('position', new BufferAttribute(new Float32Array([
        -1,
        -1,
        0.5,
        3,
        -1,
        0.5,
        -1,
        3,
        0.5
    ]), 3));
    const fullScreenMesh = new Mesh(fullScreenTri, shadowMaterialVertical);
    const scope = this;
    this.enabled = false;
    this.autoUpdate = true;
    this.needsUpdate = false;
    this.type = PCFShadowMap;
    this.render = function(lights, scene, camera) {
        if (scope.enabled === false) return;
        if (scope.autoUpdate === false && scope.needsUpdate === false) return;
        if (lights.length === 0) return;
        const currentRenderTarget = _renderer.getRenderTarget();
        const activeCubeFace = _renderer.getActiveCubeFace();
        const activeMipmapLevel = _renderer.getActiveMipmapLevel();
        const _state = _renderer.state;
        _state.setBlending(NoBlending);
        _state.buffers.color.setClear(1, 1, 1, 1);
        _state.buffers.depth.setTest(true);
        _state.setScissorTest(false);
        for(let i = 0, il = lights.length; i < il; i++){
            const light = lights[i];
            const shadow = light.shadow;
            if (shadow === undefined) {
                console.warn('THREE.WebGLShadowMap:', light, 'has no shadow.');
                continue;
            }
            if (shadow.autoUpdate === false && shadow.needsUpdate === false) continue;
            _shadowMapSize.copy(shadow.mapSize);
            const shadowFrameExtents = shadow.getFrameExtents();
            _shadowMapSize.multiply(shadowFrameExtents);
            _viewportSize.copy(shadow.mapSize);
            if (_shadowMapSize.x > _maxTextureSize || _shadowMapSize.y > _maxTextureSize) {
                if (_shadowMapSize.x > _maxTextureSize) {
                    _viewportSize.x = Math.floor(_maxTextureSize / shadowFrameExtents.x);
                    _shadowMapSize.x = _viewportSize.x * shadowFrameExtents.x;
                    shadow.mapSize.x = _viewportSize.x;
                }
                if (_shadowMapSize.y > _maxTextureSize) {
                    _viewportSize.y = Math.floor(_maxTextureSize / shadowFrameExtents.y);
                    _shadowMapSize.y = _viewportSize.y * shadowFrameExtents.y;
                    shadow.mapSize.y = _viewportSize.y;
                }
            }
            if (shadow.map === null) {
                const pars = this.type !== VSMShadowMap ? {
                    minFilter: NearestFilter,
                    magFilter: NearestFilter
                } : {};
                shadow.map = new WebGLRenderTarget(_shadowMapSize.x, _shadowMapSize.y, pars);
                shadow.map.texture.name = light.name + '.shadowMap';
                shadow.camera.updateProjectionMatrix();
            }
            _renderer.setRenderTarget(shadow.map);
            _renderer.clear();
            const viewportCount = shadow.getViewportCount();
            for(let vp = 0; vp < viewportCount; vp++){
                const viewport = shadow.getViewport(vp);
                _viewport.set(_viewportSize.x * viewport.x, _viewportSize.y * viewport.y, _viewportSize.x * viewport.z, _viewportSize.y * viewport.w);
                _state.viewport(_viewport);
                shadow.updateMatrices(light, vp);
                _frustum = shadow.getFrustum();
                renderObject(scene, camera, shadow.camera, light, this.type);
            }
            if (shadow.isPointLightShadow !== true && this.type === VSMShadowMap) {
                VSMPass(shadow, camera);
            }
            shadow.needsUpdate = false;
        }
        scope.needsUpdate = false;
        _renderer.setRenderTarget(currentRenderTarget, activeCubeFace, activeMipmapLevel);
    };
    function VSMPass(shadow, camera) {
        const geometry = _objects.update(fullScreenMesh);
        if (shadowMaterialVertical.defines.VSM_SAMPLES !== shadow.blurSamples) {
            shadowMaterialVertical.defines.VSM_SAMPLES = shadow.blurSamples;
            shadowMaterialHorizontal.defines.VSM_SAMPLES = shadow.blurSamples;
            shadowMaterialVertical.needsUpdate = true;
            shadowMaterialHorizontal.needsUpdate = true;
        }
        if (shadow.mapPass === null) {
            shadow.mapPass = new WebGLRenderTarget(_shadowMapSize.x, _shadowMapSize.y);
        }
        shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
        shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
        shadowMaterialVertical.uniforms.radius.value = shadow.radius;
        _renderer.setRenderTarget(shadow.mapPass);
        _renderer.clear();
        _renderer.renderBufferDirect(camera, null, geometry, shadowMaterialVertical, fullScreenMesh, null);
        shadowMaterialHorizontal.uniforms.shadow_pass.value = shadow.mapPass.texture;
        shadowMaterialHorizontal.uniforms.resolution.value = shadow.mapSize;
        shadowMaterialHorizontal.uniforms.radius.value = shadow.radius;
        _renderer.setRenderTarget(shadow.map);
        _renderer.clear();
        _renderer.renderBufferDirect(camera, null, geometry, shadowMaterialHorizontal, fullScreenMesh, null);
    }
    function getDepthMaterial(object, material, light, type) {
        let result = null;
        const customMaterial = light.isPointLight === true ? object.customDistanceMaterial : object.customDepthMaterial;
        if (customMaterial !== undefined) {
            result = customMaterial;
        } else {
            result = light.isPointLight === true ? _distanceMaterial : _depthMaterial;
            if (_renderer.localClippingEnabled && material.clipShadows === true && Array.isArray(material.clippingPlanes) && material.clippingPlanes.length !== 0 || material.displacementMap && material.displacementScale !== 0 || material.alphaMap && material.alphaTest > 0 || material.map && material.alphaTest > 0) {
                const keyA = result.uuid, keyB = material.uuid;
                let materialsForVariant = _materialCache[keyA];
                if (materialsForVariant === undefined) {
                    materialsForVariant = {};
                    _materialCache[keyA] = materialsForVariant;
                }
                let cachedMaterial = materialsForVariant[keyB];
                if (cachedMaterial === undefined) {
                    cachedMaterial = result.clone();
                    materialsForVariant[keyB] = cachedMaterial;
                }
                result = cachedMaterial;
            }
        }
        result.visible = material.visible;
        result.wireframe = material.wireframe;
        if (type === 3) {
            result.side = material.shadowSide !== null ? material.shadowSide : material.side;
        } else {
            result.side = material.shadowSide !== null ? material.shadowSide : shadowSide[material.side];
        }
        result.alphaMap = material.alphaMap;
        result.alphaTest = material.alphaTest;
        result.map = material.map;
        result.clipShadows = material.clipShadows;
        result.clippingPlanes = material.clippingPlanes;
        result.clipIntersection = material.clipIntersection;
        result.displacementMap = material.displacementMap;
        result.displacementScale = material.displacementScale;
        result.displacementBias = material.displacementBias;
        result.wireframeLinewidth = material.wireframeLinewidth;
        result.linewidth = material.linewidth;
        if (light.isPointLight === true && result.isMeshDistanceMaterial === true) {
            const materialProperties = _renderer.properties.get(result);
            materialProperties.light = light;
        }
        return result;
    }
    function renderObject(object, camera, shadowCamera, light, type) {
        if (object.visible === false) return;
        const visible = object.layers.test(camera.layers);
        if (visible && (object.isMesh || object.isLine || object.isPoints)) {
            if ((object.castShadow || object.receiveShadow && type === 3) && (!object.frustumCulled || _frustum.intersectsObject(object))) {
                object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);
                const geometry = _objects.update(object);
                const material = object.material;
                if (Array.isArray(material)) {
                    const groups = geometry.groups;
                    for(let k = 0, kl = groups.length; k < kl; k++){
                        const group = groups[k];
                        const groupMaterial = material[group.materialIndex];
                        if (groupMaterial && groupMaterial.visible) {
                            const depthMaterial = getDepthMaterial(object, groupMaterial, light, type);
                            _renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, group);
                        }
                    }
                } else if (material.visible) {
                    const depthMaterial1 = getDepthMaterial(object, material, light, type);
                    _renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial1, object, null);
                }
            }
        }
        const children = object.children;
        for(let i = 0, l = children.length; i < l; i++){
            renderObject(children[i], camera, shadowCamera, light, type);
        }
    }
}
function WebGLState(gl, extensions, capabilities) {
    const isWebGL2 = capabilities.isWebGL2;
    function ColorBuffer() {
        let locked = false;
        const color = new Vector4();
        let currentColorMask = null;
        const currentColorClear = new Vector4(0, 0, 0, 0);
        return {
            setMask: function(colorMask) {
                if (currentColorMask !== colorMask && !locked) {
                    gl.colorMask(colorMask, colorMask, colorMask, colorMask);
                    currentColorMask = colorMask;
                }
            },
            setLocked: function(lock) {
                locked = lock;
            },
            setClear: function(r, g, b, a, premultipliedAlpha) {
                if (premultipliedAlpha === true) {
                    r *= a;
                    g *= a;
                    b *= a;
                }
                color.set(r, g, b, a);
                if (currentColorClear.equals(color) === false) {
                    gl.clearColor(r, g, b, a);
                    currentColorClear.copy(color);
                }
            },
            reset: function() {
                locked = false;
                currentColorMask = null;
                currentColorClear.set(-1, 0, 0, 0);
            }
        };
    }
    function DepthBuffer() {
        let locked = false;
        let currentDepthMask = null;
        let currentDepthFunc = null;
        let currentDepthClear = null;
        return {
            setTest: function(depthTest) {
                if (depthTest) {
                    enable(2929);
                } else {
                    disable(2929);
                }
            },
            setMask: function(depthMask) {
                if (currentDepthMask !== depthMask && !locked) {
                    gl.depthMask(depthMask);
                    currentDepthMask = depthMask;
                }
            },
            setFunc: function(depthFunc) {
                if (currentDepthFunc !== depthFunc) {
                    switch(depthFunc){
                        case 0:
                            gl.depthFunc(512);
                            break;
                        case 1:
                            gl.depthFunc(519);
                            break;
                        case 2:
                            gl.depthFunc(513);
                            break;
                        case 3:
                            gl.depthFunc(515);
                            break;
                        case 4:
                            gl.depthFunc(514);
                            break;
                        case 5:
                            gl.depthFunc(518);
                            break;
                        case 6:
                            gl.depthFunc(516);
                            break;
                        case 7:
                            gl.depthFunc(517);
                            break;
                        default:
                            gl.depthFunc(515);
                    }
                    currentDepthFunc = depthFunc;
                }
            },
            setLocked: function(lock) {
                locked = lock;
            },
            setClear: function(depth) {
                if (currentDepthClear !== depth) {
                    gl.clearDepth(depth);
                    currentDepthClear = depth;
                }
            },
            reset: function() {
                locked = false;
                currentDepthMask = null;
                currentDepthFunc = null;
                currentDepthClear = null;
            }
        };
    }
    function StencilBuffer() {
        let locked = false;
        let currentStencilMask = null;
        let currentStencilFunc = null;
        let currentStencilRef = null;
        let currentStencilFuncMask = null;
        let currentStencilFail = null;
        let currentStencilZFail = null;
        let currentStencilZPass = null;
        let currentStencilClear = null;
        return {
            setTest: function(stencilTest) {
                if (!locked) {
                    if (stencilTest) {
                        enable(2960);
                    } else {
                        disable(2960);
                    }
                }
            },
            setMask: function(stencilMask) {
                if (currentStencilMask !== stencilMask && !locked) {
                    gl.stencilMask(stencilMask);
                    currentStencilMask = stencilMask;
                }
            },
            setFunc: function(stencilFunc, stencilRef, stencilMask) {
                if (currentStencilFunc !== stencilFunc || currentStencilRef !== stencilRef || currentStencilFuncMask !== stencilMask) {
                    gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
                    currentStencilFunc = stencilFunc;
                    currentStencilRef = stencilRef;
                    currentStencilFuncMask = stencilMask;
                }
            },
            setOp: function(stencilFail, stencilZFail, stencilZPass) {
                if (currentStencilFail !== stencilFail || currentStencilZFail !== stencilZFail || currentStencilZPass !== stencilZPass) {
                    gl.stencilOp(stencilFail, stencilZFail, stencilZPass);
                    currentStencilFail = stencilFail;
                    currentStencilZFail = stencilZFail;
                    currentStencilZPass = stencilZPass;
                }
            },
            setLocked: function(lock) {
                locked = lock;
            },
            setClear: function(stencil) {
                if (currentStencilClear !== stencil) {
                    gl.clearStencil(stencil);
                    currentStencilClear = stencil;
                }
            },
            reset: function() {
                locked = false;
                currentStencilMask = null;
                currentStencilFunc = null;
                currentStencilRef = null;
                currentStencilFuncMask = null;
                currentStencilFail = null;
                currentStencilZFail = null;
                currentStencilZPass = null;
                currentStencilClear = null;
            }
        };
    }
    const colorBuffer = new ColorBuffer();
    const depthBuffer = new DepthBuffer();
    const stencilBuffer = new StencilBuffer();
    const uboBindings = new WeakMap();
    const uboProgramMap = new WeakMap();
    let enabledCapabilities = {};
    let currentBoundFramebuffers = {};
    let currentDrawbuffers = new WeakMap();
    let defaultDrawbuffers = [];
    let currentProgram = null;
    let currentBlendingEnabled = false;
    let currentBlending = null;
    let currentBlendEquation = null;
    let currentBlendSrc = null;
    let currentBlendDst = null;
    let currentBlendEquationAlpha = null;
    let currentBlendSrcAlpha = null;
    let currentBlendDstAlpha = null;
    let currentPremultipledAlpha = false;
    let currentFlipSided = null;
    let currentCullFace = null;
    let currentLineWidth = null;
    let currentPolygonOffsetFactor = null;
    let currentPolygonOffsetUnits = null;
    const maxTextures = gl.getParameter(35661);
    let lineWidthAvailable = false;
    let version = 0;
    const glVersion = gl.getParameter(7938);
    if (glVersion.indexOf('WebGL') !== -1) {
        version = parseFloat(/^WebGL (\d)/.exec(glVersion)[1]);
        lineWidthAvailable = version >= 1.0;
    } else if (glVersion.indexOf('OpenGL ES') !== -1) {
        version = parseFloat(/^OpenGL ES (\d)/.exec(glVersion)[1]);
        lineWidthAvailable = version >= 2.0;
    }
    let currentTextureSlot = null;
    let currentBoundTextures = {};
    const scissorParam = gl.getParameter(3088);
    const viewportParam = gl.getParameter(2978);
    const currentScissor = new Vector4().fromArray(scissorParam);
    const currentViewport = new Vector4().fromArray(viewportParam);
    function createTexture(type, target, count) {
        const data = new Uint8Array(4);
        const texture = gl.createTexture();
        gl.bindTexture(type, texture);
        gl.texParameteri(type, 10241, 9728);
        gl.texParameteri(type, 10240, 9728);
        for(let i = 0; i < count; i++){
            gl.texImage2D(target + i, 0, 6408, 1, 1, 0, 6408, 5121, data);
        }
        return texture;
    }
    const emptyTextures = {};
    emptyTextures[3553] = createTexture(3553, 3553, 1);
    emptyTextures[34067] = createTexture(34067, 34069, 6);
    colorBuffer.setClear(0, 0, 0, 1);
    depthBuffer.setClear(1);
    stencilBuffer.setClear(0);
    enable(2929);
    depthBuffer.setFunc(3);
    setFlipSided(false);
    setCullFace(1);
    enable(2884);
    setBlending(0);
    function enable(id) {
        if (enabledCapabilities[id] !== true) {
            gl.enable(id);
            enabledCapabilities[id] = true;
        }
    }
    function disable(id) {
        if (enabledCapabilities[id] !== false) {
            gl.disable(id);
            enabledCapabilities[id] = false;
        }
    }
    function bindFramebuffer(target, framebuffer) {
        if (currentBoundFramebuffers[target] !== framebuffer) {
            gl.bindFramebuffer(target, framebuffer);
            currentBoundFramebuffers[target] = framebuffer;
            if (isWebGL2) {
                if (target === 36009) {
                    currentBoundFramebuffers[36160] = framebuffer;
                }
                if (target === 36160) {
                    currentBoundFramebuffers[36009] = framebuffer;
                }
            }
            return true;
        }
        return false;
    }
    function drawBuffers(renderTarget, framebuffer) {
        let drawBuffers = defaultDrawbuffers;
        let needsUpdate = false;
        if (renderTarget) {
            drawBuffers = currentDrawbuffers.get(framebuffer);
            if (drawBuffers === undefined) {
                drawBuffers = [];
                currentDrawbuffers.set(framebuffer, drawBuffers);
            }
            if (renderTarget.isWebGLMultipleRenderTargets) {
                const textures = renderTarget.texture;
                if (drawBuffers.length !== textures.length || drawBuffers[0] !== 36064) {
                    for(let i = 0, il = textures.length; i < il; i++){
                        drawBuffers[i] = 36064 + i;
                    }
                    drawBuffers.length = textures.length;
                    needsUpdate = true;
                }
            } else {
                if (drawBuffers[0] !== 36064) {
                    drawBuffers[0] = 36064;
                    needsUpdate = true;
                }
            }
        } else {
            if (drawBuffers[0] !== 1029) {
                drawBuffers[0] = 1029;
                needsUpdate = true;
            }
        }
        if (needsUpdate) {
            if (capabilities.isWebGL2) {
                gl.drawBuffers(drawBuffers);
            } else {
                extensions.get('WEBGL_draw_buffers').drawBuffersWEBGL(drawBuffers);
            }
        }
    }
    function useProgram(program) {
        if (currentProgram !== program) {
            gl.useProgram(program);
            currentProgram = program;
            return true;
        }
        return false;
    }
    const equationToGL = {
        [100]: 32774,
        [101]: 32778,
        [102]: 32779
    };
    if (isWebGL2) {
        equationToGL[MinEquation] = 32775;
        equationToGL[MaxEquation] = 32776;
    } else {
        const extension = extensions.get('EXT_blend_minmax');
        if (extension !== null) {
            equationToGL[MinEquation] = extension.MIN_EXT;
            equationToGL[MaxEquation] = extension.MAX_EXT;
        }
    }
    const factorToGL = {
        [200]: 0,
        [201]: 1,
        [202]: 768,
        [204]: 770,
        [210]: 776,
        [208]: 774,
        [206]: 772,
        [203]: 769,
        [205]: 771,
        [209]: 775,
        [207]: 773
    };
    function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
        if (blending === 0) {
            if (currentBlendingEnabled === true) {
                disable(3042);
                currentBlendingEnabled = false;
            }
            return;
        }
        if (currentBlendingEnabled === false) {
            enable(3042);
            currentBlendingEnabled = true;
        }
        if (blending !== 5) {
            if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {
                if (currentBlendEquation !== 100 || currentBlendEquationAlpha !== 100) {
                    gl.blendEquation(32774);
                    currentBlendEquation = AddEquation;
                    currentBlendEquationAlpha = AddEquation;
                }
                if (premultipliedAlpha) {
                    switch(blending){
                        case 1:
                            gl.blendFuncSeparate(1, 771, 1, 771);
                            break;
                        case 2:
                            gl.blendFunc(1, 1);
                            break;
                        case 3:
                            gl.blendFuncSeparate(0, 769, 0, 1);
                            break;
                        case 4:
                            gl.blendFuncSeparate(0, 768, 0, 770);
                            break;
                        default:
                            console.error('THREE.WebGLState: Invalid blending: ', blending);
                            break;
                    }
                } else {
                    switch(blending){
                        case 1:
                            gl.blendFuncSeparate(770, 771, 1, 771);
                            break;
                        case 2:
                            gl.blendFunc(770, 1);
                            break;
                        case 3:
                            gl.blendFuncSeparate(0, 769, 0, 1);
                            break;
                        case 4:
                            gl.blendFunc(0, 768);
                            break;
                        default:
                            console.error('THREE.WebGLState: Invalid blending: ', blending);
                            break;
                    }
                }
                currentBlendSrc = null;
                currentBlendDst = null;
                currentBlendSrcAlpha = null;
                currentBlendDstAlpha = null;
                currentBlending = blending;
                currentPremultipledAlpha = premultipliedAlpha;
            }
            return;
        }
        blendEquationAlpha = blendEquationAlpha || blendEquation;
        blendSrcAlpha = blendSrcAlpha || blendSrc;
        blendDstAlpha = blendDstAlpha || blendDst;
        if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {
            gl.blendEquationSeparate(equationToGL[blendEquation], equationToGL[blendEquationAlpha]);
            currentBlendEquation = blendEquation;
            currentBlendEquationAlpha = blendEquationAlpha;
        }
        if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {
            gl.blendFuncSeparate(factorToGL[blendSrc], factorToGL[blendDst], factorToGL[blendSrcAlpha], factorToGL[blendDstAlpha]);
            currentBlendSrc = blendSrc;
            currentBlendDst = blendDst;
            currentBlendSrcAlpha = blendSrcAlpha;
            currentBlendDstAlpha = blendDstAlpha;
        }
        currentBlending = blending;
        currentPremultipledAlpha = false;
    }
    function setMaterial(material, frontFaceCW) {
        material.side === 2 ? disable(2884) : enable(2884);
        let flipSided = material.side === 1;
        if (frontFaceCW) flipSided = !flipSided;
        setFlipSided(flipSided);
        material.blending === 1 && material.transparent === false ? setBlending(0) : setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);
        depthBuffer.setFunc(material.depthFunc);
        depthBuffer.setTest(material.depthTest);
        depthBuffer.setMask(material.depthWrite);
        colorBuffer.setMask(material.colorWrite);
        const stencilWrite = material.stencilWrite;
        stencilBuffer.setTest(stencilWrite);
        if (stencilWrite) {
            stencilBuffer.setMask(material.stencilWriteMask);
            stencilBuffer.setFunc(material.stencilFunc, material.stencilRef, material.stencilFuncMask);
            stencilBuffer.setOp(material.stencilFail, material.stencilZFail, material.stencilZPass);
        }
        setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
        material.alphaToCoverage === true ? enable(32926) : disable(32926);
    }
    function setFlipSided(flipSided) {
        if (currentFlipSided !== flipSided) {
            if (flipSided) {
                gl.frontFace(2304);
            } else {
                gl.frontFace(2305);
            }
            currentFlipSided = flipSided;
        }
    }
    function setCullFace(cullFace) {
        if (cullFace !== 0) {
            enable(2884);
            if (cullFace !== currentCullFace) {
                if (cullFace === 1) {
                    gl.cullFace(1029);
                } else if (cullFace === 2) {
                    gl.cullFace(1028);
                } else {
                    gl.cullFace(1032);
                }
            }
        } else {
            disable(2884);
        }
        currentCullFace = cullFace;
    }
    function setLineWidth(width) {
        if (width !== currentLineWidth) {
            if (lineWidthAvailable) gl.lineWidth(width);
            currentLineWidth = width;
        }
    }
    function setPolygonOffset(polygonOffset, factor, units) {
        if (polygonOffset) {
            enable(32823);
            if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {
                gl.polygonOffset(factor, units);
                currentPolygonOffsetFactor = factor;
                currentPolygonOffsetUnits = units;
            }
        } else {
            disable(32823);
        }
    }
    function setScissorTest(scissorTest) {
        if (scissorTest) {
            enable(3089);
        } else {
            disable(3089);
        }
    }
    function activeTexture(webglSlot) {
        if (webglSlot === undefined) webglSlot = 33984 + maxTextures - 1;
        if (currentTextureSlot !== webglSlot) {
            gl.activeTexture(webglSlot);
            currentTextureSlot = webglSlot;
        }
    }
    function bindTexture(webglType, webglTexture, webglSlot) {
        if (webglSlot === undefined) {
            if (currentTextureSlot === null) {
                webglSlot = 33984 + maxTextures - 1;
            } else {
                webglSlot = currentTextureSlot;
            }
        }
        let boundTexture = currentBoundTextures[webglSlot];
        if (boundTexture === undefined) {
            boundTexture = {
                type: undefined,
                texture: undefined
            };
            currentBoundTextures[webglSlot] = boundTexture;
        }
        if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
            if (currentTextureSlot !== webglSlot) {
                gl.activeTexture(webglSlot);
                currentTextureSlot = webglSlot;
            }
            gl.bindTexture(webglType, webglTexture || emptyTextures[webglType]);
            boundTexture.type = webglType;
            boundTexture.texture = webglTexture;
        }
    }
    function unbindTexture() {
        const boundTexture = currentBoundTextures[currentTextureSlot];
        if (boundTexture !== undefined && boundTexture.type !== undefined) {
            gl.bindTexture(boundTexture.type, null);
            boundTexture.type = undefined;
            boundTexture.texture = undefined;
        }
    }
    function compressedTexImage2D() {
        try {
            gl.compressedTexImage2D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function compressedTexImage3D() {
        try {
            gl.compressedTexImage3D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function texSubImage2D() {
        try {
            gl.texSubImage2D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function texSubImage3D() {
        try {
            gl.texSubImage3D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function compressedTexSubImage2D() {
        try {
            gl.compressedTexSubImage2D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function compressedTexSubImage3D() {
        try {
            gl.compressedTexSubImage3D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function texStorage2D() {
        try {
            gl.texStorage2D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function texStorage3D() {
        try {
            gl.texStorage3D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function texImage2D() {
        try {
            gl.texImage2D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function texImage3D() {
        try {
            gl.texImage3D.apply(gl, arguments);
        } catch (error) {
            console.error('THREE.WebGLState:', error);
        }
    }
    function scissor(scissor) {
        if (currentScissor.equals(scissor) === false) {
            gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
            currentScissor.copy(scissor);
        }
    }
    function viewport(viewport) {
        if (currentViewport.equals(viewport) === false) {
            gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
            currentViewport.copy(viewport);
        }
    }
    function updateUBOMapping(uniformsGroup, program) {
        let mapping = uboProgramMap.get(program);
        if (mapping === undefined) {
            mapping = new WeakMap();
            uboProgramMap.set(program, mapping);
        }
        let blockIndex = mapping.get(uniformsGroup);
        if (blockIndex === undefined) {
            blockIndex = gl.getUniformBlockIndex(program, uniformsGroup.name);
            mapping.set(uniformsGroup, blockIndex);
        }
    }
    function uniformBlockBinding(uniformsGroup, program) {
        const mapping = uboProgramMap.get(program);
        const blockIndex = mapping.get(uniformsGroup);
        if (uboBindings.get(program) !== blockIndex) {
            gl.uniformBlockBinding(program, blockIndex, uniformsGroup.__bindingPointIndex);
            uboBindings.set(program, blockIndex);
        }
    }
    function reset() {
        gl.disable(3042);
        gl.disable(2884);
        gl.disable(2929);
        gl.disable(32823);
        gl.disable(3089);
        gl.disable(2960);
        gl.disable(32926);
        gl.blendEquation(32774);
        gl.blendFunc(1, 0);
        gl.blendFuncSeparate(1, 0, 1, 0);
        gl.colorMask(true, true, true, true);
        gl.clearColor(0, 0, 0, 0);
        gl.depthMask(true);
        gl.depthFunc(513);
        gl.clearDepth(1);
        gl.stencilMask(0xffffffff);
        gl.stencilFunc(519, 0, 0xffffffff);
        gl.stencilOp(7680, 7680, 7680);
        gl.clearStencil(0);
        gl.cullFace(1029);
        gl.frontFace(2305);
        gl.polygonOffset(0, 0);
        gl.activeTexture(33984);
        gl.bindFramebuffer(36160, null);
        if (isWebGL2 === true) {
            gl.bindFramebuffer(36009, null);
            gl.bindFramebuffer(36008, null);
        }
        gl.useProgram(null);
        gl.lineWidth(1);
        gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        enabledCapabilities = {};
        currentTextureSlot = null;
        currentBoundTextures = {};
        currentBoundFramebuffers = {};
        currentDrawbuffers = new WeakMap();
        defaultDrawbuffers = [];
        currentProgram = null;
        currentBlendingEnabled = false;
        currentBlending = null;
        currentBlendEquation = null;
        currentBlendSrc = null;
        currentBlendDst = null;
        currentBlendEquationAlpha = null;
        currentBlendSrcAlpha = null;
        currentBlendDstAlpha = null;
        currentPremultipledAlpha = false;
        currentFlipSided = null;
        currentCullFace = null;
        currentLineWidth = null;
        currentPolygonOffsetFactor = null;
        currentPolygonOffsetUnits = null;
        currentScissor.set(0, 0, gl.canvas.width, gl.canvas.height);
        currentViewport.set(0, 0, gl.canvas.width, gl.canvas.height);
        colorBuffer.reset();
        depthBuffer.reset();
        stencilBuffer.reset();
    }
    return {
        buffers: {
            color: colorBuffer,
            depth: depthBuffer,
            stencil: stencilBuffer
        },
        enable: enable,
        disable: disable,
        bindFramebuffer: bindFramebuffer,
        drawBuffers: drawBuffers,
        useProgram: useProgram,
        setBlending: setBlending,
        setMaterial: setMaterial,
        setFlipSided: setFlipSided,
        setCullFace: setCullFace,
        setLineWidth: setLineWidth,
        setPolygonOffset: setPolygonOffset,
        setScissorTest: setScissorTest,
        activeTexture: activeTexture,
        bindTexture: bindTexture,
        unbindTexture: unbindTexture,
        compressedTexImage2D: compressedTexImage2D,
        compressedTexImage3D: compressedTexImage3D,
        texImage2D: texImage2D,
        texImage3D: texImage3D,
        updateUBOMapping: updateUBOMapping,
        uniformBlockBinding: uniformBlockBinding,
        texStorage2D: texStorage2D,
        texStorage3D: texStorage3D,
        texSubImage2D: texSubImage2D,
        texSubImage3D: texSubImage3D,
        compressedTexSubImage2D: compressedTexSubImage2D,
        compressedTexSubImage3D: compressedTexSubImage3D,
        scissor: scissor,
        viewport: viewport,
        reset: reset
    };
}
function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info) {
    const isWebGL2 = capabilities.isWebGL2;
    const maxTextures = capabilities.maxTextures;
    const maxCubemapSize = capabilities.maxCubemapSize;
    const maxTextureSize = capabilities.maxTextureSize;
    const maxSamples = capabilities.maxSamples;
    const multisampledRTTExt = extensions.has('WEBGL_multisampled_render_to_texture') ? extensions.get('WEBGL_multisampled_render_to_texture') : null;
    const supportsInvalidateFramebuffer = typeof navigator === 'undefined' ? false : /OculusBrowser/g.test(navigator.userAgent);
    const _videoTextures = new WeakMap();
    let _canvas;
    const _sources = new WeakMap();
    let useOffscreenCanvas = false;
    try {
        useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined' && new OffscreenCanvas(1, 1).getContext('2d') !== null;
    } catch (err) {}
    function createCanvas(width, height) {
        return useOffscreenCanvas ? new OffscreenCanvas(width, height) : createElementNS('canvas');
    }
    function resizeImage(image, needsPowerOfTwo, needsNewCanvas, maxSize) {
        let scale = 1;
        if (image.width > maxSize || image.height > maxSize) {
            scale = maxSize / Math.max(image.width, image.height);
        }
        if (scale < 1 || needsPowerOfTwo === true) {
            if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
                const floor = needsPowerOfTwo ? floorPowerOfTwo : Math.floor;
                const width = floor(scale * image.width);
                const height = floor(scale * image.height);
                if (_canvas === undefined) _canvas = createCanvas(width, height);
                const canvas = needsNewCanvas ? createCanvas(width, height) : _canvas;
                canvas.width = width;
                canvas.height = height;
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, width, height);
                console.warn('THREE.WebGLRenderer: Texture has been resized from (' + image.width + 'x' + image.height + ') to (' + width + 'x' + height + ').');
                return canvas;
            } else {
                if ('data' in image) {
                    console.warn('THREE.WebGLRenderer: Image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
                }
                return image;
            }
        }
        return image;
    }
    function isPowerOfTwo$1(image) {
        return isPowerOfTwo(image.width) && isPowerOfTwo(image.height);
    }
    function textureNeedsPowerOfTwo(texture) {
        if (isWebGL2) return false;
        return texture.wrapS !== 1001 || texture.wrapT !== 1001 || texture.minFilter !== 1003 && texture.minFilter !== 1006;
    }
    function textureNeedsGenerateMipmaps(texture, supportsMips) {
        return texture.generateMipmaps && supportsMips && texture.minFilter !== 1003 && texture.minFilter !== 1006;
    }
    function generateMipmap(target) {
        _gl.generateMipmap(target);
    }
    function getInternalFormat(internalFormatName, glFormat, glType, encoding, forceLinearEncoding = false) {
        if (isWebGL2 === false) return glFormat;
        if (internalFormatName !== null) {
            if (_gl[internalFormatName] !== undefined) return _gl[internalFormatName];
            console.warn('THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'');
        }
        let internalFormat = glFormat;
        if (glFormat === 6403) {
            if (glType === 5126) internalFormat = 33326;
            if (glType === 5131) internalFormat = 33325;
            if (glType === 5121) internalFormat = 33321;
        }
        if (glFormat === 33319) {
            if (glType === 5126) internalFormat = 33328;
            if (glType === 5131) internalFormat = 33327;
            if (glType === 5121) internalFormat = 33323;
        }
        if (glFormat === 6408) {
            if (glType === 5126) internalFormat = 34836;
            if (glType === 5131) internalFormat = 34842;
            if (glType === 5121) internalFormat = encoding === sRGBEncoding && forceLinearEncoding === false ? 35907 : 32856;
            if (glType === 32819) internalFormat = 32854;
            if (glType === 32820) internalFormat = 32855;
        }
        if (internalFormat === 33325 || internalFormat === 33326 || internalFormat === 33327 || internalFormat === 33328 || internalFormat === 34842 || internalFormat === 34836) {
            extensions.get('EXT_color_buffer_float');
        }
        return internalFormat;
    }
    function getMipLevels(texture, image, supportsMips) {
        if (textureNeedsGenerateMipmaps(texture, supportsMips) === true || texture.isFramebufferTexture && texture.minFilter !== 1003 && texture.minFilter !== 1006) {
            return Math.log2(Math.max(image.width, image.height)) + 1;
        } else if (texture.mipmaps !== undefined && texture.mipmaps.length > 0) {
            return texture.mipmaps.length;
        } else if (texture.isCompressedTexture && Array.isArray(texture.image)) {
            return image.mipmaps.length;
        } else {
            return 1;
        }
    }
    function filterFallback(f) {
        if (f === 1003 || f === 1004 || f === 1005) {
            return 9728;
        }
        return 9729;
    }
    function onTextureDispose(event) {
        const texture = event.target;
        texture.removeEventListener('dispose', onTextureDispose);
        deallocateTexture(texture);
        if (texture.isVideoTexture) {
            _videoTextures.delete(texture);
        }
    }
    function onRenderTargetDispose(event) {
        const renderTarget = event.target;
        renderTarget.removeEventListener('dispose', onRenderTargetDispose);
        deallocateRenderTarget(renderTarget);
    }
    function deallocateTexture(texture) {
        const textureProperties = properties.get(texture);
        if (textureProperties.__webglInit === undefined) return;
        const source = texture.source;
        const webglTextures = _sources.get(source);
        if (webglTextures) {
            const webglTexture = webglTextures[textureProperties.__cacheKey];
            webglTexture.usedTimes--;
            if (webglTexture.usedTimes === 0) {
                deleteTexture(texture);
            }
            if (Object.keys(webglTextures).length === 0) {
                _sources.delete(source);
            }
        }
        properties.remove(texture);
    }
    function deleteTexture(texture) {
        const textureProperties = properties.get(texture);
        _gl.deleteTexture(textureProperties.__webglTexture);
        const source = texture.source;
        const webglTextures = _sources.get(source);
        delete webglTextures[textureProperties.__cacheKey];
        info.memory.textures--;
    }
    function deallocateRenderTarget(renderTarget) {
        const texture = renderTarget.texture;
        const renderTargetProperties = properties.get(renderTarget);
        const textureProperties = properties.get(texture);
        if (textureProperties.__webglTexture !== undefined) {
            _gl.deleteTexture(textureProperties.__webglTexture);
            info.memory.textures--;
        }
        if (renderTarget.depthTexture) {
            renderTarget.depthTexture.dispose();
        }
        if (renderTarget.isWebGLCubeRenderTarget) {
            for(let i = 0; i < 6; i++){
                _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i]);
                if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer[i]);
            }
        } else {
            _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);
            if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer);
            if (renderTargetProperties.__webglMultisampledFramebuffer) _gl.deleteFramebuffer(renderTargetProperties.__webglMultisampledFramebuffer);
            if (renderTargetProperties.__webglColorRenderbuffer) {
                for(let i1 = 0; i1 < renderTargetProperties.__webglColorRenderbuffer.length; i1++){
                    if (renderTargetProperties.__webglColorRenderbuffer[i1]) _gl.deleteRenderbuffer(renderTargetProperties.__webglColorRenderbuffer[i1]);
                }
            }
            if (renderTargetProperties.__webglDepthRenderbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthRenderbuffer);
        }
        if (renderTarget.isWebGLMultipleRenderTargets) {
            for(let i2 = 0, il = texture.length; i2 < il; i2++){
                const attachmentProperties = properties.get(texture[i2]);
                if (attachmentProperties.__webglTexture) {
                    _gl.deleteTexture(attachmentProperties.__webglTexture);
                    info.memory.textures--;
                }
                properties.remove(texture[i2]);
            }
        }
        properties.remove(texture);
        properties.remove(renderTarget);
    }
    let textureUnits = 0;
    function resetTextureUnits() {
        textureUnits = 0;
    }
    function allocateTextureUnit() {
        const textureUnit = textureUnits;
        if (textureUnit >= maxTextures) {
            console.warn('THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + maxTextures);
        }
        textureUnits += 1;
        return textureUnit;
    }
    function getTextureCacheKey(texture) {
        const array = [];
        array.push(texture.wrapS);
        array.push(texture.wrapT);
        array.push(texture.wrapR || 0);
        array.push(texture.magFilter);
        array.push(texture.minFilter);
        array.push(texture.anisotropy);
        array.push(texture.internalFormat);
        array.push(texture.format);
        array.push(texture.type);
        array.push(texture.generateMipmaps);
        array.push(texture.premultiplyAlpha);
        array.push(texture.flipY);
        array.push(texture.unpackAlignment);
        array.push(texture.encoding);
        return array.join();
    }
    function setTexture2D(texture, slot) {
        const textureProperties = properties.get(texture);
        if (texture.isVideoTexture) updateVideoTexture(texture);
        if (texture.isRenderTargetTexture === false && texture.version > 0 && textureProperties.__version !== texture.version) {
            const image = texture.image;
            if (image === null) {
                console.warn('THREE.WebGLRenderer: Texture marked for update but no image data found.');
            } else if (image.complete === false) {
                console.warn('THREE.WebGLRenderer: Texture marked for update but image is incomplete');
            } else {
                uploadTexture(textureProperties, texture, slot);
                return;
            }
        }
        state.bindTexture(3553, textureProperties.__webglTexture, 33984 + slot);
    }
    function setTexture2DArray(texture, slot) {
        const textureProperties = properties.get(texture);
        if (texture.version > 0 && textureProperties.__version !== texture.version) {
            uploadTexture(textureProperties, texture, slot);
            return;
        }
        state.bindTexture(35866, textureProperties.__webglTexture, 33984 + slot);
    }
    function setTexture3D(texture, slot) {
        const textureProperties = properties.get(texture);
        if (texture.version > 0 && textureProperties.__version !== texture.version) {
            uploadTexture(textureProperties, texture, slot);
            return;
        }
        state.bindTexture(32879, textureProperties.__webglTexture, 33984 + slot);
    }
    function setTextureCube(texture, slot) {
        const textureProperties = properties.get(texture);
        if (texture.version > 0 && textureProperties.__version !== texture.version) {
            uploadCubeTexture(textureProperties, texture, slot);
            return;
        }
        state.bindTexture(34067, textureProperties.__webglTexture, 33984 + slot);
    }
    const wrappingToGL = {
        [1000]: 10497,
        [1001]: 33071,
        [1002]: 33648
    };
    const filterToGL = {
        [1003]: 9728,
        [1004]: 9984,
        [1005]: 9986,
        [1006]: 9729,
        [1007]: 9985,
        [1008]: 9987
    };
    function setTextureParameters(textureType, texture, supportsMips) {
        if (supportsMips) {
            _gl.texParameteri(textureType, 10242, wrappingToGL[texture.wrapS]);
            _gl.texParameteri(textureType, 10243, wrappingToGL[texture.wrapT]);
            if (textureType === 32879 || textureType === 35866) {
                _gl.texParameteri(textureType, 32882, wrappingToGL[texture.wrapR]);
            }
            _gl.texParameteri(textureType, 10240, filterToGL[texture.magFilter]);
            _gl.texParameteri(textureType, 10241, filterToGL[texture.minFilter]);
        } else {
            _gl.texParameteri(textureType, 10242, 33071);
            _gl.texParameteri(textureType, 10243, 33071);
            if (textureType === 32879 || textureType === 35866) {
                _gl.texParameteri(textureType, 32882, 33071);
            }
            if (texture.wrapS !== 1001 || texture.wrapT !== 1001) {
                console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.');
            }
            _gl.texParameteri(textureType, 10240, filterFallback(texture.magFilter));
            _gl.texParameteri(textureType, 10241, filterFallback(texture.minFilter));
            if (texture.minFilter !== 1003 && texture.minFilter !== 1006) {
                console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.');
            }
        }
        if (extensions.has('EXT_texture_filter_anisotropic') === true) {
            const extension = extensions.get('EXT_texture_filter_anisotropic');
            if (texture.magFilter === 1003) return;
            if (texture.minFilter !== 1005 && texture.minFilter !== 1008) return;
            if (texture.type === 1015 && extensions.has('OES_texture_float_linear') === false) return;
            if (isWebGL2 === false && texture.type === 1016 && extensions.has('OES_texture_half_float_linear') === false) return;
            if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {
                _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
                properties.get(texture).__currentAnisotropy = texture.anisotropy;
            }
        }
    }
    function initTexture(textureProperties, texture) {
        let forceUpload = false;
        if (textureProperties.__webglInit === undefined) {
            textureProperties.__webglInit = true;
            texture.addEventListener('dispose', onTextureDispose);
        }
        const source = texture.source;
        let webglTextures = _sources.get(source);
        if (webglTextures === undefined) {
            webglTextures = {};
            _sources.set(source, webglTextures);
        }
        const textureCacheKey = getTextureCacheKey(texture);
        if (textureCacheKey !== textureProperties.__cacheKey) {
            if (webglTextures[textureCacheKey] === undefined) {
                webglTextures[textureCacheKey] = {
                    texture: _gl.createTexture(),
                    usedTimes: 0
                };
                info.memory.textures++;
                forceUpload = true;
            }
            webglTextures[textureCacheKey].usedTimes++;
            const webglTexture = webglTextures[textureProperties.__cacheKey];
            if (webglTexture !== undefined) {
                webglTextures[textureProperties.__cacheKey].usedTimes--;
                if (webglTexture.usedTimes === 0) {
                    deleteTexture(texture);
                }
            }
            textureProperties.__cacheKey = textureCacheKey;
            textureProperties.__webglTexture = webglTextures[textureCacheKey].texture;
        }
        return forceUpload;
    }
    function uploadTexture(textureProperties, texture, slot) {
        let textureType = 3553;
        if (texture.isDataArrayTexture || texture.isCompressedArrayTexture) textureType = 35866;
        if (texture.isData3DTexture) textureType = 32879;
        const forceUpload = initTexture(textureProperties, texture);
        const source = texture.source;
        state.bindTexture(textureType, textureProperties.__webglTexture, 33984 + slot);
        const sourceProperties = properties.get(source);
        if (source.version !== sourceProperties.__version || forceUpload === true) {
            state.activeTexture(33984 + slot);
            _gl.pixelStorei(37440, texture.flipY);
            _gl.pixelStorei(37441, texture.premultiplyAlpha);
            _gl.pixelStorei(3317, texture.unpackAlignment);
            _gl.pixelStorei(37443, 0);
            const needsPowerOfTwo = textureNeedsPowerOfTwo(texture) && isPowerOfTwo$1(texture.image) === false;
            let image = resizeImage(texture.image, needsPowerOfTwo, false, maxTextureSize);
            image = verifyColorSpace(texture, image);
            const supportsMips = isPowerOfTwo$1(image) || isWebGL2, glFormat = utils.convert(texture.format, texture.encoding);
            let glType = utils.convert(texture.type), glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.encoding, texture.isVideoTexture);
            setTextureParameters(textureType, texture, supportsMips);
            let mipmap;
            const mipmaps = texture.mipmaps;
            const useTexStorage = isWebGL2 && texture.isVideoTexture !== true;
            const allocateMemory = sourceProperties.__version === undefined || forceUpload === true;
            const levels = getMipLevels(texture, image, supportsMips);
            if (texture.isDepthTexture) {
                glInternalFormat = 6402;
                if (isWebGL2) {
                    if (texture.type === 1015) {
                        glInternalFormat = 36012;
                    } else if (texture.type === 1014) {
                        glInternalFormat = 33190;
                    } else if (texture.type === 1020) {
                        glInternalFormat = 35056;
                    } else {
                        glInternalFormat = 33189;
                    }
                } else {
                    if (texture.type === 1015) {
                        console.error('WebGLRenderer: Floating point depth texture requires WebGL2.');
                    }
                }
                if (texture.format === 1026 && glInternalFormat === 6402) {
                    if (texture.type !== 1012 && texture.type !== 1014) {
                        console.warn('THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.');
                        texture.type = UnsignedIntType;
                        glType = utils.convert(texture.type);
                    }
                }
                if (texture.format === 1027 && glInternalFormat === 6402) {
                    glInternalFormat = 34041;
                    if (texture.type !== 1020) {
                        console.warn('THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.');
                        texture.type = UnsignedInt248Type;
                        glType = utils.convert(texture.type);
                    }
                }
                if (allocateMemory) {
                    if (useTexStorage) {
                        state.texStorage2D(3553, 1, glInternalFormat, image.width, image.height);
                    } else {
                        state.texImage2D(3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null);
                    }
                }
            } else if (texture.isDataTexture) {
                if (mipmaps.length > 0 && supportsMips) {
                    if (useTexStorage && allocateMemory) {
                        state.texStorage2D(3553, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height);
                    }
                    for(let i = 0, il = mipmaps.length; i < il; i++){
                        mipmap = mipmaps[i];
                        if (useTexStorage) {
                            state.texSubImage2D(3553, i, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
                        } else {
                            state.texImage2D(3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
                        }
                    }
                    texture.generateMipmaps = false;
                } else {
                    if (useTexStorage) {
                        if (allocateMemory) {
                            state.texStorage2D(3553, levels, glInternalFormat, image.width, image.height);
                        }
                        state.texSubImage2D(3553, 0, 0, 0, image.width, image.height, glFormat, glType, image.data);
                    } else {
                        state.texImage2D(3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data);
                    }
                }
            } else if (texture.isCompressedTexture) {
                if (texture.isCompressedArrayTexture) {
                    if (useTexStorage && allocateMemory) {
                        state.texStorage3D(35866, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height, image.depth);
                    }
                    for(let i1 = 0, il1 = mipmaps.length; i1 < il1; i1++){
                        mipmap = mipmaps[i1];
                        if (texture.format !== 1023) {
                            if (glFormat !== null) {
                                if (useTexStorage) {
                                    state.compressedTexSubImage3D(35866, i1, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, mipmap.data, 0, 0);
                                } else {
                                    state.compressedTexImage3D(35866, i1, glInternalFormat, mipmap.width, mipmap.height, image.depth, 0, mipmap.data, 0, 0);
                                }
                            } else {
                                console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()');
                            }
                        } else {
                            if (useTexStorage) {
                                state.texSubImage3D(35866, i1, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, glType, mipmap.data);
                            } else {
                                state.texImage3D(35866, i1, glInternalFormat, mipmap.width, mipmap.height, image.depth, 0, glFormat, glType, mipmap.data);
                            }
                        }
                    }
                } else {
                    if (useTexStorage && allocateMemory) {
                        state.texStorage2D(3553, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height);
                    }
                    for(let i2 = 0, il2 = mipmaps.length; i2 < il2; i2++){
                        mipmap = mipmaps[i2];
                        if (texture.format !== 1023) {
                            if (glFormat !== null) {
                                if (useTexStorage) {
                                    state.compressedTexSubImage2D(3553, i2, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data);
                                } else {
                                    state.compressedTexImage2D(3553, i2, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
                                }
                            } else {
                                console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()');
                            }
                        } else {
                            if (useTexStorage) {
                                state.texSubImage2D(3553, i2, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
                            } else {
                                state.texImage2D(3553, i2, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
                            }
                        }
                    }
                }
            } else if (texture.isDataArrayTexture) {
                if (useTexStorage) {
                    if (allocateMemory) {
                        state.texStorage3D(35866, levels, glInternalFormat, image.width, image.height, image.depth);
                    }
                    state.texSubImage3D(35866, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data);
                } else {
                    state.texImage3D(35866, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
                }
            } else if (texture.isData3DTexture) {
                if (useTexStorage) {
                    if (allocateMemory) {
                        state.texStorage3D(32879, levels, glInternalFormat, image.width, image.height, image.depth);
                    }
                    state.texSubImage3D(32879, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data);
                } else {
                    state.texImage3D(32879, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
                }
            } else if (texture.isFramebufferTexture) {
                if (allocateMemory) {
                    if (useTexStorage) {
                        state.texStorage2D(3553, levels, glInternalFormat, image.width, image.height);
                    } else {
                        let width = image.width, height = image.height;
                        for(let i3 = 0; i3 < levels; i3++){
                            state.texImage2D(3553, i3, glInternalFormat, width, height, 0, glFormat, glType, null);
                            width >>= 1;
                            height >>= 1;
                        }
                    }
                }
            } else {
                if (mipmaps.length > 0 && supportsMips) {
                    if (useTexStorage && allocateMemory) {
                        state.texStorage2D(3553, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height);
                    }
                    for(let i4 = 0, il3 = mipmaps.length; i4 < il3; i4++){
                        mipmap = mipmaps[i4];
                        if (useTexStorage) {
                            state.texSubImage2D(3553, i4, 0, 0, glFormat, glType, mipmap);
                        } else {
                            state.texImage2D(3553, i4, glInternalFormat, glFormat, glType, mipmap);
                        }
                    }
                    texture.generateMipmaps = false;
                } else {
                    if (useTexStorage) {
                        if (allocateMemory) {
                            state.texStorage2D(3553, levels, glInternalFormat, image.width, image.height);
                        }
                        state.texSubImage2D(3553, 0, 0, 0, glFormat, glType, image);
                    } else {
                        state.texImage2D(3553, 0, glInternalFormat, glFormat, glType, image);
                    }
                }
            }
            if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
                generateMipmap(textureType);
            }
            sourceProperties.__version = source.version;
            if (texture.onUpdate) texture.onUpdate(texture);
        }
        textureProperties.__version = texture.version;
    }
    function uploadCubeTexture(textureProperties, texture, slot) {
        if (texture.image.length !== 6) return;
        const forceUpload = initTexture(textureProperties, texture);
        const source = texture.source;
        state.bindTexture(34067, textureProperties.__webglTexture, 33984 + slot);
        const sourceProperties = properties.get(source);
        if (source.version !== sourceProperties.__version || forceUpload === true) {
            state.activeTexture(33984 + slot);
            _gl.pixelStorei(37440, texture.flipY);
            _gl.pixelStorei(37441, texture.premultiplyAlpha);
            _gl.pixelStorei(3317, texture.unpackAlignment);
            _gl.pixelStorei(37443, 0);
            const isCompressed = texture.isCompressedTexture || texture.image[0].isCompressedTexture;
            const isDataTexture = texture.image[0] && texture.image[0].isDataTexture;
            const cubeImage = [];
            for(let i = 0; i < 6; i++){
                if (!isCompressed && !isDataTexture) {
                    cubeImage[i] = resizeImage(texture.image[i], false, true, maxCubemapSize);
                } else {
                    cubeImage[i] = isDataTexture ? texture.image[i].image : texture.image[i];
                }
                cubeImage[i] = verifyColorSpace(texture, cubeImage[i]);
            }
            const image = cubeImage[0], supportsMips = isPowerOfTwo$1(image) || isWebGL2, glFormat = utils.convert(texture.format, texture.encoding), glType = utils.convert(texture.type), glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.encoding);
            const useTexStorage = isWebGL2 && texture.isVideoTexture !== true;
            const allocateMemory = sourceProperties.__version === undefined || forceUpload === true;
            let levels = getMipLevels(texture, image, supportsMips);
            setTextureParameters(34067, texture, supportsMips);
            let mipmaps;
            if (isCompressed) {
                if (useTexStorage && allocateMemory) {
                    state.texStorage2D(34067, levels, glInternalFormat, image.width, image.height);
                }
                for(let i1 = 0; i1 < 6; i1++){
                    mipmaps = cubeImage[i1].mipmaps;
                    for(let j = 0; j < mipmaps.length; j++){
                        const mipmap = mipmaps[j];
                        if (texture.format !== 1023) {
                            if (glFormat !== null) {
                                if (useTexStorage) {
                                    state.compressedTexSubImage2D(34069 + i1, j, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data);
                                } else {
                                    state.compressedTexImage2D(34069 + i1, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
                                }
                            } else {
                                console.warn('THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()');
                            }
                        } else {
                            if (useTexStorage) {
                                state.texSubImage2D(34069 + i1, j, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
                            } else {
                                state.texImage2D(34069 + i1, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
                            }
                        }
                    }
                }
            } else {
                mipmaps = texture.mipmaps;
                if (useTexStorage && allocateMemory) {
                    if (mipmaps.length > 0) levels++;
                    state.texStorage2D(34067, levels, glInternalFormat, cubeImage[0].width, cubeImage[0].height);
                }
                for(let i2 = 0; i2 < 6; i2++){
                    if (isDataTexture) {
                        if (useTexStorage) {
                            state.texSubImage2D(34069 + i2, 0, 0, 0, cubeImage[i2].width, cubeImage[i2].height, glFormat, glType, cubeImage[i2].data);
                        } else {
                            state.texImage2D(34069 + i2, 0, glInternalFormat, cubeImage[i2].width, cubeImage[i2].height, 0, glFormat, glType, cubeImage[i2].data);
                        }
                        for(let j1 = 0; j1 < mipmaps.length; j1++){
                            const mipmap1 = mipmaps[j1];
                            const mipmapImage = mipmap1.image[i2].image;
                            if (useTexStorage) {
                                state.texSubImage2D(34069 + i2, j1 + 1, 0, 0, mipmapImage.width, mipmapImage.height, glFormat, glType, mipmapImage.data);
                            } else {
                                state.texImage2D(34069 + i2, j1 + 1, glInternalFormat, mipmapImage.width, mipmapImage.height, 0, glFormat, glType, mipmapImage.data);
                            }
                        }
                    } else {
                        if (useTexStorage) {
                            state.texSubImage2D(34069 + i2, 0, 0, 0, glFormat, glType, cubeImage[i2]);
                        } else {
                            state.texImage2D(34069 + i2, 0, glInternalFormat, glFormat, glType, cubeImage[i2]);
                        }
                        for(let j2 = 0; j2 < mipmaps.length; j2++){
                            const mipmap2 = mipmaps[j2];
                            if (useTexStorage) {
                                state.texSubImage2D(34069 + i2, j2 + 1, 0, 0, glFormat, glType, mipmap2.image[i2]);
                            } else {
                                state.texImage2D(34069 + i2, j2 + 1, glInternalFormat, glFormat, glType, mipmap2.image[i2]);
                            }
                        }
                    }
                }
            }
            if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
                generateMipmap(34067);
            }
            sourceProperties.__version = source.version;
            if (texture.onUpdate) texture.onUpdate(texture);
        }
        textureProperties.__version = texture.version;
    }
    function setupFrameBufferTexture(framebuffer, renderTarget, texture, attachment, textureTarget) {
        const glFormat = utils.convert(texture.format, texture.encoding);
        const glType = utils.convert(texture.type);
        const glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.encoding);
        const renderTargetProperties = properties.get(renderTarget);
        if (!renderTargetProperties.__hasExternalTextures) {
            if (textureTarget === 32879 || textureTarget === 35866) {
                state.texImage3D(textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, renderTarget.depth, 0, glFormat, glType, null);
            } else {
                state.texImage2D(textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null);
            }
        }
        state.bindFramebuffer(36160, framebuffer);
        if (useMultisampledRTT(renderTarget)) {
            multisampledRTTExt.framebufferTexture2DMultisampleEXT(36160, attachment, textureTarget, properties.get(texture).__webglTexture, 0, getRenderTargetSamples(renderTarget));
        } else if (textureTarget === 3553 || textureTarget >= 34069 && textureTarget <= 34074) {
            _gl.framebufferTexture2D(36160, attachment, textureTarget, properties.get(texture).__webglTexture, 0);
        }
        state.bindFramebuffer(36160, null);
    }
    function setupRenderBufferStorage(renderbuffer, renderTarget, isMultisample) {
        _gl.bindRenderbuffer(36161, renderbuffer);
        if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {
            let glInternalFormat = 33189;
            if (isMultisample || useMultisampledRTT(renderTarget)) {
                const depthTexture = renderTarget.depthTexture;
                if (depthTexture && depthTexture.isDepthTexture) {
                    if (depthTexture.type === 1015) {
                        glInternalFormat = 36012;
                    } else if (depthTexture.type === 1014) {
                        glInternalFormat = 33190;
                    }
                }
                const samples = getRenderTargetSamples(renderTarget);
                if (useMultisampledRTT(renderTarget)) {
                    multisampledRTTExt.renderbufferStorageMultisampleEXT(36161, samples, glInternalFormat, renderTarget.width, renderTarget.height);
                } else {
                    _gl.renderbufferStorageMultisample(36161, samples, glInternalFormat, renderTarget.width, renderTarget.height);
                }
            } else {
                _gl.renderbufferStorage(36161, glInternalFormat, renderTarget.width, renderTarget.height);
            }
            _gl.framebufferRenderbuffer(36160, 36096, 36161, renderbuffer);
        } else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {
            const samples1 = getRenderTargetSamples(renderTarget);
            if (isMultisample && useMultisampledRTT(renderTarget) === false) {
                _gl.renderbufferStorageMultisample(36161, samples1, 35056, renderTarget.width, renderTarget.height);
            } else if (useMultisampledRTT(renderTarget)) {
                multisampledRTTExt.renderbufferStorageMultisampleEXT(36161, samples1, 35056, renderTarget.width, renderTarget.height);
            } else {
                _gl.renderbufferStorage(36161, 34041, renderTarget.width, renderTarget.height);
            }
            _gl.framebufferRenderbuffer(36160, 33306, 36161, renderbuffer);
        } else {
            const textures = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture : [
                renderTarget.texture
            ];
            for(let i = 0; i < textures.length; i++){
                const texture = textures[i];
                const glFormat = utils.convert(texture.format, texture.encoding);
                const glType = utils.convert(texture.type);
                const glInternalFormat1 = getInternalFormat(texture.internalFormat, glFormat, glType, texture.encoding);
                const samples2 = getRenderTargetSamples(renderTarget);
                if (isMultisample && useMultisampledRTT(renderTarget) === false) {
                    _gl.renderbufferStorageMultisample(36161, samples2, glInternalFormat1, renderTarget.width, renderTarget.height);
                } else if (useMultisampledRTT(renderTarget)) {
                    multisampledRTTExt.renderbufferStorageMultisampleEXT(36161, samples2, glInternalFormat1, renderTarget.width, renderTarget.height);
                } else {
                    _gl.renderbufferStorage(36161, glInternalFormat1, renderTarget.width, renderTarget.height);
                }
            }
        }
        _gl.bindRenderbuffer(36161, null);
    }
    function setupDepthTexture(framebuffer, renderTarget) {
        const isCube = renderTarget && renderTarget.isWebGLCubeRenderTarget;
        if (isCube) throw new Error('Depth Texture with cube render targets is not supported');
        state.bindFramebuffer(36160, framebuffer);
        if (!(renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture)) {
            throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture');
        }
        if (!properties.get(renderTarget.depthTexture).__webglTexture || renderTarget.depthTexture.image.width !== renderTarget.width || renderTarget.depthTexture.image.height !== renderTarget.height) {
            renderTarget.depthTexture.image.width = renderTarget.width;
            renderTarget.depthTexture.image.height = renderTarget.height;
            renderTarget.depthTexture.needsUpdate = true;
        }
        setTexture2D(renderTarget.depthTexture, 0);
        const webglDepthTexture = properties.get(renderTarget.depthTexture).__webglTexture;
        const samples = getRenderTargetSamples(renderTarget);
        if (renderTarget.depthTexture.format === 1026) {
            if (useMultisampledRTT(renderTarget)) {
                multisampledRTTExt.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, webglDepthTexture, 0, samples);
            } else {
                _gl.framebufferTexture2D(36160, 36096, 3553, webglDepthTexture, 0);
            }
        } else if (renderTarget.depthTexture.format === 1027) {
            if (useMultisampledRTT(renderTarget)) {
                multisampledRTTExt.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, webglDepthTexture, 0, samples);
            } else {
                _gl.framebufferTexture2D(36160, 33306, 3553, webglDepthTexture, 0);
            }
        } else {
            throw new Error('Unknown depthTexture format');
        }
    }
    function setupDepthRenderbuffer(renderTarget) {
        const renderTargetProperties = properties.get(renderTarget);
        const isCube = renderTarget.isWebGLCubeRenderTarget === true;
        if (renderTarget.depthTexture && !renderTargetProperties.__autoAllocateDepthBuffer) {
            if (isCube) throw new Error('target.depthTexture not supported in Cube render targets');
            setupDepthTexture(renderTargetProperties.__webglFramebuffer, renderTarget);
        } else {
            if (isCube) {
                renderTargetProperties.__webglDepthbuffer = [];
                for(let i = 0; i < 6; i++){
                    state.bindFramebuffer(36160, renderTargetProperties.__webglFramebuffer[i]);
                    renderTargetProperties.__webglDepthbuffer[i] = _gl.createRenderbuffer();
                    setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer[i], renderTarget, false);
                }
            } else {
                state.bindFramebuffer(36160, renderTargetProperties.__webglFramebuffer);
                renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
                setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer, renderTarget, false);
            }
        }
        state.bindFramebuffer(36160, null);
    }
    function rebindTextures(renderTarget, colorTexture, depthTexture) {
        const renderTargetProperties = properties.get(renderTarget);
        if (colorTexture !== undefined) {
            setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, renderTarget.texture, 36064, 3553);
        }
        if (depthTexture !== undefined) {
            setupDepthRenderbuffer(renderTarget);
        }
    }
    function setupRenderTarget(renderTarget) {
        const texture = renderTarget.texture;
        const renderTargetProperties = properties.get(renderTarget);
        const textureProperties = properties.get(texture);
        renderTarget.addEventListener('dispose', onRenderTargetDispose);
        if (renderTarget.isWebGLMultipleRenderTargets !== true) {
            if (textureProperties.__webglTexture === undefined) {
                textureProperties.__webglTexture = _gl.createTexture();
            }
            textureProperties.__version = texture.version;
            info.memory.textures++;
        }
        const isCube = renderTarget.isWebGLCubeRenderTarget === true;
        const isMultipleRenderTargets = renderTarget.isWebGLMultipleRenderTargets === true;
        const supportsMips = isPowerOfTwo$1(renderTarget) || isWebGL2;
        if (isCube) {
            renderTargetProperties.__webglFramebuffer = [];
            for(let i = 0; i < 6; i++){
                renderTargetProperties.__webglFramebuffer[i] = _gl.createFramebuffer();
            }
        } else {
            renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();
            if (isMultipleRenderTargets) {
                if (capabilities.drawBuffers) {
                    const textures = renderTarget.texture;
                    for(let i1 = 0, il = textures.length; i1 < il; i1++){
                        const attachmentProperties = properties.get(textures[i1]);
                        if (attachmentProperties.__webglTexture === undefined) {
                            attachmentProperties.__webglTexture = _gl.createTexture();
                            info.memory.textures++;
                        }
                    }
                } else {
                    console.warn('THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.');
                }
            }
            if (isWebGL2 && renderTarget.samples > 0 && useMultisampledRTT(renderTarget) === false) {
                const textures1 = isMultipleRenderTargets ? texture : [
                    texture
                ];
                renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
                renderTargetProperties.__webglColorRenderbuffer = [];
                state.bindFramebuffer(36160, renderTargetProperties.__webglMultisampledFramebuffer);
                for(let i2 = 0; i2 < textures1.length; i2++){
                    const texture1 = textures1[i2];
                    renderTargetProperties.__webglColorRenderbuffer[i2] = _gl.createRenderbuffer();
                    _gl.bindRenderbuffer(36161, renderTargetProperties.__webglColorRenderbuffer[i2]);
                    const glFormat = utils.convert(texture1.format, texture1.encoding);
                    const glType = utils.convert(texture1.type);
                    const glInternalFormat = getInternalFormat(texture1.internalFormat, glFormat, glType, texture1.encoding, renderTarget.isXRRenderTarget === true);
                    const samples = getRenderTargetSamples(renderTarget);
                    _gl.renderbufferStorageMultisample(36161, samples, glInternalFormat, renderTarget.width, renderTarget.height);
                    _gl.framebufferRenderbuffer(36160, 36064 + i2, 36161, renderTargetProperties.__webglColorRenderbuffer[i2]);
                }
                _gl.bindRenderbuffer(36161, null);
                if (renderTarget.depthBuffer) {
                    renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
                    setupRenderBufferStorage(renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true);
                }
                state.bindFramebuffer(36160, null);
            }
        }
        if (isCube) {
            state.bindTexture(34067, textureProperties.__webglTexture);
            setTextureParameters(34067, texture, supportsMips);
            for(let i3 = 0; i3 < 6; i3++){
                setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[i3], renderTarget, texture, 36064, 34069 + i3);
            }
            if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
                generateMipmap(34067);
            }
            state.unbindTexture();
        } else if (isMultipleRenderTargets) {
            const textures2 = renderTarget.texture;
            for(let i4 = 0, il1 = textures2.length; i4 < il1; i4++){
                const attachment = textures2[i4];
                const attachmentProperties1 = properties.get(attachment);
                state.bindTexture(3553, attachmentProperties1.__webglTexture);
                setTextureParameters(3553, attachment, supportsMips);
                setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, attachment, 36064 + i4, 3553);
                if (textureNeedsGenerateMipmaps(attachment, supportsMips)) {
                    generateMipmap(3553);
                }
            }
            state.unbindTexture();
        } else {
            let glTextureType = 3553;
            if (renderTarget.isWebGL3DRenderTarget || renderTarget.isWebGLArrayRenderTarget) {
                if (isWebGL2) {
                    glTextureType = renderTarget.isWebGL3DRenderTarget ? 32879 : 35866;
                } else {
                    console.error('THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.');
                }
            }
            state.bindTexture(glTextureType, textureProperties.__webglTexture);
            setTextureParameters(glTextureType, texture, supportsMips);
            setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, texture, 36064, glTextureType);
            if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
                generateMipmap(glTextureType);
            }
            state.unbindTexture();
        }
        if (renderTarget.depthBuffer) {
            setupDepthRenderbuffer(renderTarget);
        }
    }
    function updateRenderTargetMipmap(renderTarget) {
        const supportsMips = isPowerOfTwo$1(renderTarget) || isWebGL2;
        const textures = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture : [
            renderTarget.texture
        ];
        for(let i = 0, il = textures.length; i < il; i++){
            const texture = textures[i];
            if (textureNeedsGenerateMipmaps(texture, supportsMips)) {
                const target = renderTarget.isWebGLCubeRenderTarget ? 34067 : 3553;
                const webglTexture = properties.get(texture).__webglTexture;
                state.bindTexture(target, webglTexture);
                generateMipmap(target);
                state.unbindTexture();
            }
        }
    }
    function updateMultisampleRenderTarget(renderTarget) {
        if (isWebGL2 && renderTarget.samples > 0 && useMultisampledRTT(renderTarget) === false) {
            const textures = renderTarget.isWebGLMultipleRenderTargets ? renderTarget.texture : [
                renderTarget.texture
            ];
            const width = renderTarget.width;
            const height = renderTarget.height;
            let mask = 16384;
            const invalidationArray = [];
            const depthStyle = renderTarget.stencilBuffer ? 33306 : 36096;
            const renderTargetProperties = properties.get(renderTarget);
            const isMultipleRenderTargets = renderTarget.isWebGLMultipleRenderTargets === true;
            if (isMultipleRenderTargets) {
                for(let i = 0; i < textures.length; i++){
                    state.bindFramebuffer(36160, renderTargetProperties.__webglMultisampledFramebuffer);
                    _gl.framebufferRenderbuffer(36160, 36064 + i, 36161, null);
                    state.bindFramebuffer(36160, renderTargetProperties.__webglFramebuffer);
                    _gl.framebufferTexture2D(36009, 36064 + i, 3553, null, 0);
                }
            }
            state.bindFramebuffer(36008, renderTargetProperties.__webglMultisampledFramebuffer);
            state.bindFramebuffer(36009, renderTargetProperties.__webglFramebuffer);
            for(let i1 = 0; i1 < textures.length; i1++){
                invalidationArray.push(36064 + i1);
                if (renderTarget.depthBuffer) {
                    invalidationArray.push(depthStyle);
                }
                const ignoreDepthValues = renderTargetProperties.__ignoreDepthValues !== undefined ? renderTargetProperties.__ignoreDepthValues : false;
                if (ignoreDepthValues === false) {
                    if (renderTarget.depthBuffer) mask |= 256;
                    if (renderTarget.stencilBuffer) mask |= 1024;
                }
                if (isMultipleRenderTargets) {
                    _gl.framebufferRenderbuffer(36008, 36064, 36161, renderTargetProperties.__webglColorRenderbuffer[i1]);
                }
                if (ignoreDepthValues === true) {
                    _gl.invalidateFramebuffer(36008, [
                        depthStyle
                    ]);
                    _gl.invalidateFramebuffer(36009, [
                        depthStyle
                    ]);
                }
                if (isMultipleRenderTargets) {
                    const webglTexture = properties.get(textures[i1]).__webglTexture;
                    _gl.framebufferTexture2D(36009, 36064, 3553, webglTexture, 0);
                }
                _gl.blitFramebuffer(0, 0, width, height, 0, 0, width, height, mask, 9728);
                if (supportsInvalidateFramebuffer) {
                    _gl.invalidateFramebuffer(36008, invalidationArray);
                }
            }
            state.bindFramebuffer(36008, null);
            state.bindFramebuffer(36009, null);
            if (isMultipleRenderTargets) {
                for(let i2 = 0; i2 < textures.length; i2++){
                    state.bindFramebuffer(36160, renderTargetProperties.__webglMultisampledFramebuffer);
                    _gl.framebufferRenderbuffer(36160, 36064 + i2, 36161, renderTargetProperties.__webglColorRenderbuffer[i2]);
                    const webglTexture1 = properties.get(textures[i2]).__webglTexture;
                    state.bindFramebuffer(36160, renderTargetProperties.__webglFramebuffer);
                    _gl.framebufferTexture2D(36009, 36064 + i2, 3553, webglTexture1, 0);
                }
            }
            state.bindFramebuffer(36009, renderTargetProperties.__webglMultisampledFramebuffer);
        }
    }
    function getRenderTargetSamples(renderTarget) {
        return Math.min(maxSamples, renderTarget.samples);
    }
    function useMultisampledRTT(renderTarget) {
        const renderTargetProperties = properties.get(renderTarget);
        return isWebGL2 && renderTarget.samples > 0 && extensions.has('WEBGL_multisampled_render_to_texture') === true && renderTargetProperties.__useRenderToTexture !== false;
    }
    function updateVideoTexture(texture) {
        const frame = info.render.frame;
        if (_videoTextures.get(texture) !== frame) {
            _videoTextures.set(texture, frame);
            texture.update();
        }
    }
    function verifyColorSpace(texture, image) {
        const encoding = texture.encoding;
        const format = texture.format;
        const type = texture.type;
        if (texture.isCompressedTexture === true || texture.isVideoTexture === true || texture.format === 1035) return image;
        if (encoding !== 3000) {
            if (encoding === 3001) {
                if (isWebGL2 === false) {
                    if (extensions.has('EXT_sRGB') === true && format === 1023) {
                        texture.format = _SRGBAFormat;
                        texture.minFilter = LinearFilter;
                        texture.generateMipmaps = false;
                    } else {
                        image = ImageUtils.sRGBToLinear(image);
                    }
                } else {
                    if (format !== 1023 || type !== 1009) {
                        console.warn('THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.');
                    }
                }
            } else {
                console.error('THREE.WebGLTextures: Unsupported texture encoding:', encoding);
            }
        }
        return image;
    }
    this.allocateTextureUnit = allocateTextureUnit;
    this.resetTextureUnits = resetTextureUnits;
    this.setTexture2D = setTexture2D;
    this.setTexture2DArray = setTexture2DArray;
    this.setTexture3D = setTexture3D;
    this.setTextureCube = setTextureCube;
    this.rebindTextures = rebindTextures;
    this.setupRenderTarget = setupRenderTarget;
    this.updateRenderTargetMipmap = updateRenderTargetMipmap;
    this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;
    this.setupDepthRenderbuffer = setupDepthRenderbuffer;
    this.setupFrameBufferTexture = setupFrameBufferTexture;
    this.useMultisampledRTT = useMultisampledRTT;
}
function WebGLUtils(gl, extensions, capabilities) {
    const isWebGL2 = capabilities.isWebGL2;
    function convert(p, encoding = null) {
        let extension;
        if (p === 1009) return 5121;
        if (p === 1017) return 32819;
        if (p === 1018) return 32820;
        if (p === 1010) return 5120;
        if (p === 1011) return 5122;
        if (p === 1012) return 5123;
        if (p === 1013) return 5124;
        if (p === 1014) return 5125;
        if (p === 1015) return 5126;
        if (p === 1016) {
            if (isWebGL2) return 5131;
            extension = extensions.get('OES_texture_half_float');
            if (extension !== null) {
                return extension.HALF_FLOAT_OES;
            } else {
                return null;
            }
        }
        if (p === 1021) return 6406;
        if (p === 1023) return 6408;
        if (p === 1024) return 6409;
        if (p === 1025) return 6410;
        if (p === 1026) return 6402;
        if (p === 1027) return 34041;
        if (p === 1035) {
            extension = extensions.get('EXT_sRGB');
            if (extension !== null) {
                return extension.SRGB_ALPHA_EXT;
            } else {
                return null;
            }
        }
        if (p === 1028) return 6403;
        if (p === 1029) return 36244;
        if (p === 1030) return 33319;
        if (p === 1031) return 33320;
        if (p === 1033) return 36249;
        if (p === 33776 || p === 33777 || p === 33778 || p === 33779) {
            if (encoding === 3001) {
                extension = extensions.get('WEBGL_compressed_texture_s3tc_srgb');
                if (extension !== null) {
                    if (p === 33776) return extension.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                    if (p === 33777) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                    if (p === 33778) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                    if (p === 33779) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
                } else {
                    return null;
                }
            } else {
                extension = extensions.get('WEBGL_compressed_texture_s3tc');
                if (extension !== null) {
                    if (p === 33776) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (p === 33777) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (p === 33778) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (p === 33779) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                } else {
                    return null;
                }
            }
        }
        if (p === 35840 || p === 35841 || p === 35842 || p === 35843) {
            extension = extensions.get('WEBGL_compressed_texture_pvrtc');
            if (extension !== null) {
                if (p === 35840) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                if (p === 35841) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                if (p === 35842) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                if (p === 35843) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
            } else {
                return null;
            }
        }
        if (p === 36196) {
            extension = extensions.get('WEBGL_compressed_texture_etc1');
            if (extension !== null) {
                return extension.COMPRESSED_RGB_ETC1_WEBGL;
            } else {
                return null;
            }
        }
        if (p === 37492 || p === 37496) {
            extension = extensions.get('WEBGL_compressed_texture_etc');
            if (extension !== null) {
                if (p === 37492) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ETC2 : extension.COMPRESSED_RGB8_ETC2;
                if (p === 37496) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : extension.COMPRESSED_RGBA8_ETC2_EAC;
            } else {
                return null;
            }
        }
        if (p === 37808 || p === 37809 || p === 37810 || p === 37811 || p === 37812 || p === 37813 || p === 37814 || p === 37815 || p === 37816 || p === 37817 || p === 37818 || p === 37819 || p === 37820 || p === 37821) {
            extension = extensions.get('WEBGL_compressed_texture_astc');
            if (extension !== null) {
                if (p === 37808) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : extension.COMPRESSED_RGBA_ASTC_4x4_KHR;
                if (p === 37809) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : extension.COMPRESSED_RGBA_ASTC_5x4_KHR;
                if (p === 37810) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : extension.COMPRESSED_RGBA_ASTC_5x5_KHR;
                if (p === 37811) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : extension.COMPRESSED_RGBA_ASTC_6x5_KHR;
                if (p === 37812) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : extension.COMPRESSED_RGBA_ASTC_6x6_KHR;
                if (p === 37813) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : extension.COMPRESSED_RGBA_ASTC_8x5_KHR;
                if (p === 37814) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : extension.COMPRESSED_RGBA_ASTC_8x6_KHR;
                if (p === 37815) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : extension.COMPRESSED_RGBA_ASTC_8x8_KHR;
                if (p === 37816) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : extension.COMPRESSED_RGBA_ASTC_10x5_KHR;
                if (p === 37817) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : extension.COMPRESSED_RGBA_ASTC_10x6_KHR;
                if (p === 37818) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : extension.COMPRESSED_RGBA_ASTC_10x8_KHR;
                if (p === 37819) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : extension.COMPRESSED_RGBA_ASTC_10x10_KHR;
                if (p === 37820) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : extension.COMPRESSED_RGBA_ASTC_12x10_KHR;
                if (p === 37821) return encoding === 3001 ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : extension.COMPRESSED_RGBA_ASTC_12x12_KHR;
            } else {
                return null;
            }
        }
        if (p === 36492) {
            extension = extensions.get('EXT_texture_compression_bptc');
            if (extension !== null) {
                if (p === 36492) return encoding === 3001 ? extension.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : extension.COMPRESSED_RGBA_BPTC_UNORM_EXT;
            } else {
                return null;
            }
        }
        if (p === 36283 || p === 36284 || p === 36285 || p === 36286) {
            extension = extensions.get('EXT_texture_compression_rgtc');
            if (extension !== null) {
                if (p === 36492) return extension.COMPRESSED_RED_RGTC1_EXT;
                if (p === 36284) return extension.COMPRESSED_SIGNED_RED_RGTC1_EXT;
                if (p === 36285) return extension.COMPRESSED_RED_GREEN_RGTC2_EXT;
                if (p === 36286) return extension.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
            } else {
                return null;
            }
        }
        if (p === 1020) {
            if (isWebGL2) return 34042;
            extension = extensions.get('WEBGL_depth_texture');
            if (extension !== null) {
                return extension.UNSIGNED_INT_24_8_WEBGL;
            } else {
                return null;
            }
        }
        return gl[p] !== undefined ? gl[p] : null;
    }
    return {
        convert: convert
    };
}
class ArrayCamera extends PerspectiveCamera {
    constructor(array = []){
        super();
        this.isArrayCamera = true;
        this.cameras = array;
    }
}
class Group extends Object3D {
    constructor(){
        super();
        this.isGroup = true;
        this.type = 'Group';
    }
}
const _moveEvent = {
    type: 'move'
};
class WebXRController {
    constructor(){
        this._targetRay = null;
        this._grip = null;
        this._hand = null;
    }
    getHandSpace() {
        if (this._hand === null) {
            this._hand = new Group();
            this._hand.matrixAutoUpdate = false;
            this._hand.visible = false;
            this._hand.joints = {};
            this._hand.inputState = {
                pinching: false
            };
        }
        return this._hand;
    }
    getTargetRaySpace() {
        if (this._targetRay === null) {
            this._targetRay = new Group();
            this._targetRay.matrixAutoUpdate = false;
            this._targetRay.visible = false;
            this._targetRay.hasLinearVelocity = false;
            this._targetRay.linearVelocity = new Vector3();
            this._targetRay.hasAngularVelocity = false;
            this._targetRay.angularVelocity = new Vector3();
        }
        return this._targetRay;
    }
    getGripSpace() {
        if (this._grip === null) {
            this._grip = new Group();
            this._grip.matrixAutoUpdate = false;
            this._grip.visible = false;
            this._grip.hasLinearVelocity = false;
            this._grip.linearVelocity = new Vector3();
            this._grip.hasAngularVelocity = false;
            this._grip.angularVelocity = new Vector3();
        }
        return this._grip;
    }
    dispatchEvent(event) {
        if (this._targetRay !== null) {
            this._targetRay.dispatchEvent(event);
        }
        if (this._grip !== null) {
            this._grip.dispatchEvent(event);
        }
        if (this._hand !== null) {
            this._hand.dispatchEvent(event);
        }
        return this;
    }
    connect(inputSource) {
        if (inputSource && inputSource.hand) {
            const hand = this._hand;
            if (hand) {
                for (const inputjoint of inputSource.hand.values()){
                    this._getHandJoint(hand, inputjoint);
                }
            }
        }
        this.dispatchEvent({
            type: 'connected',
            data: inputSource
        });
        return this;
    }
    disconnect(inputSource) {
        this.dispatchEvent({
            type: 'disconnected',
            data: inputSource
        });
        if (this._targetRay !== null) {
            this._targetRay.visible = false;
        }
        if (this._grip !== null) {
            this._grip.visible = false;
        }
        if (this._hand !== null) {
            this._hand.visible = false;
        }
        return this;
    }
    update(inputSource, frame, referenceSpace) {
        let inputPose = null;
        let gripPose = null;
        let handPose = null;
        const targetRay = this._targetRay;
        const grip = this._grip;
        const hand = this._hand;
        if (inputSource && frame.session.visibilityState !== 'visible-blurred') {
            if (hand && inputSource.hand) {
                handPose = true;
                for (const inputjoint of inputSource.hand.values()){
                    const jointPose = frame.getJointPose(inputjoint, referenceSpace);
                    const joint = this._getHandJoint(hand, inputjoint);
                    if (jointPose !== null) {
                        joint.matrix.fromArray(jointPose.transform.matrix);
                        joint.matrix.decompose(joint.position, joint.rotation, joint.scale);
                        joint.jointRadius = jointPose.radius;
                    }
                    joint.visible = jointPose !== null;
                }
                const indexTip = hand.joints['index-finger-tip'];
                const thumbTip = hand.joints['thumb-tip'];
                const distance = indexTip.position.distanceTo(thumbTip.position);
                if (hand.inputState.pinching && distance > 0.02 + 0.005) {
                    hand.inputState.pinching = false;
                    this.dispatchEvent({
                        type: 'pinchend',
                        handedness: inputSource.handedness,
                        target: this
                    });
                } else if (!hand.inputState.pinching && distance <= 0.02 - 0.005) {
                    hand.inputState.pinching = true;
                    this.dispatchEvent({
                        type: 'pinchstart',
                        handedness: inputSource.handedness,
                        target: this
                    });
                }
            } else {
                if (grip !== null && inputSource.gripSpace) {
                    gripPose = frame.getPose(inputSource.gripSpace, referenceSpace);
                    if (gripPose !== null) {
                        grip.matrix.fromArray(gripPose.transform.matrix);
                        grip.matrix.decompose(grip.position, grip.rotation, grip.scale);
                        if (gripPose.linearVelocity) {
                            grip.hasLinearVelocity = true;
                            grip.linearVelocity.copy(gripPose.linearVelocity);
                        } else {
                            grip.hasLinearVelocity = false;
                        }
                        if (gripPose.angularVelocity) {
                            grip.hasAngularVelocity = true;
                            grip.angularVelocity.copy(gripPose.angularVelocity);
                        } else {
                            grip.hasAngularVelocity = false;
                        }
                    }
                }
            }
            if (targetRay !== null) {
                inputPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
                if (inputPose === null && gripPose !== null) {
                    inputPose = gripPose;
                }
                if (inputPose !== null) {
                    targetRay.matrix.fromArray(inputPose.transform.matrix);
                    targetRay.matrix.decompose(targetRay.position, targetRay.rotation, targetRay.scale);
                    if (inputPose.linearVelocity) {
                        targetRay.hasLinearVelocity = true;
                        targetRay.linearVelocity.copy(inputPose.linearVelocity);
                    } else {
                        targetRay.hasLinearVelocity = false;
                    }
                    if (inputPose.angularVelocity) {
                        targetRay.hasAngularVelocity = true;
                        targetRay.angularVelocity.copy(inputPose.angularVelocity);
                    } else {
                        targetRay.hasAngularVelocity = false;
                    }
                    this.dispatchEvent(_moveEvent);
                }
            }
        }
        if (targetRay !== null) {
            targetRay.visible = inputPose !== null;
        }
        if (grip !== null) {
            grip.visible = gripPose !== null;
        }
        if (hand !== null) {
            hand.visible = handPose !== null;
        }
        return this;
    }
    _getHandJoint(hand, inputjoint) {
        if (hand.joints[inputjoint.jointName] === undefined) {
            const joint = new Group();
            joint.matrixAutoUpdate = false;
            joint.visible = false;
            hand.joints[inputjoint.jointName] = joint;
            hand.add(joint);
        }
        return hand.joints[inputjoint.jointName];
    }
}
class DepthTexture extends Texture {
    constructor(width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format){
        format = format !== undefined ? format : DepthFormat;
        if (format !== 1026 && format !== 1027) {
            throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat');
        }
        if (type === undefined && format === 1026) type = UnsignedIntType;
        if (type === undefined && format === 1027) type = UnsignedInt248Type;
        super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
        this.isDepthTexture = true;
        this.image = {
            width: width,
            height: height
        };
        this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
        this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
        this.flipY = false;
        this.generateMipmaps = false;
    }
}
class WebXRManager extends EventDispatcher {
    constructor(renderer, gl){
        super();
        const scope = this;
        let session = null;
        let framebufferScaleFactor = 1.0;
        let referenceSpace = null;
        let referenceSpaceType = 'local-floor';
        let foveation = 1.0;
        let customReferenceSpace = null;
        let pose = null;
        let glBinding = null;
        let glProjLayer = null;
        let glBaseLayer = null;
        let xrFrame = null;
        const attributes = gl.getContextAttributes();
        let initialRenderTarget = null;
        let newRenderTarget = null;
        const controllers = [];
        const controllerInputSources = [];
        const planes = new Set();
        const planesLastChangedTimes = new Map();
        const cameraL = new PerspectiveCamera();
        cameraL.layers.enable(1);
        cameraL.viewport = new Vector4();
        const cameraR = new PerspectiveCamera();
        cameraR.layers.enable(2);
        cameraR.viewport = new Vector4();
        const cameras = [
            cameraL,
            cameraR
        ];
        const cameraVR = new ArrayCamera();
        cameraVR.layers.enable(1);
        cameraVR.layers.enable(2);
        let _currentDepthNear = null;
        let _currentDepthFar = null;
        this.cameraAutoUpdate = true;
        this.enabled = false;
        this.isPresenting = false;
        this.getController = function(index) {
            let controller = controllers[index];
            if (controller === undefined) {
                controller = new WebXRController();
                controllers[index] = controller;
            }
            return controller.getTargetRaySpace();
        };
        this.getControllerGrip = function(index) {
            let controller = controllers[index];
            if (controller === undefined) {
                controller = new WebXRController();
                controllers[index] = controller;
            }
            return controller.getGripSpace();
        };
        this.getHand = function(index) {
            let controller = controllers[index];
            if (controller === undefined) {
                controller = new WebXRController();
                controllers[index] = controller;
            }
            return controller.getHandSpace();
        };
        function onSessionEvent(event) {
            const controllerIndex = controllerInputSources.indexOf(event.inputSource);
            if (controllerIndex === -1) {
                return;
            }
            const controller = controllers[controllerIndex];
            if (controller !== undefined) {
                controller.dispatchEvent({
                    type: event.type,
                    data: event.inputSource
                });
            }
        }
        function onSessionEnd() {
            session.removeEventListener('select', onSessionEvent);
            session.removeEventListener('selectstart', onSessionEvent);
            session.removeEventListener('selectend', onSessionEvent);
            session.removeEventListener('squeeze', onSessionEvent);
            session.removeEventListener('squeezestart', onSessionEvent);
            session.removeEventListener('squeezeend', onSessionEvent);
            session.removeEventListener('end', onSessionEnd);
            session.removeEventListener('inputsourceschange', onInputSourcesChange);
            for(let i = 0; i < controllers.length; i++){
                const inputSource = controllerInputSources[i];
                if (inputSource === null) continue;
                controllerInputSources[i] = null;
                controllers[i].disconnect(inputSource);
            }
            _currentDepthNear = null;
            _currentDepthFar = null;
            renderer.setRenderTarget(initialRenderTarget);
            glBaseLayer = null;
            glProjLayer = null;
            glBinding = null;
            session = null;
            newRenderTarget = null;
            animation.stop();
            scope.isPresenting = false;
            scope.dispatchEvent({
                type: 'sessionend'
            });
        }
        this.setFramebufferScaleFactor = function(value) {
            framebufferScaleFactor = value;
            if (scope.isPresenting === true) {
                console.warn('THREE.WebXRManager: Cannot change framebuffer scale while presenting.');
            }
        };
        this.setReferenceSpaceType = function(value) {
            referenceSpaceType = value;
            if (scope.isPresenting === true) {
                console.warn('THREE.WebXRManager: Cannot change reference space type while presenting.');
            }
        };
        this.getReferenceSpace = function() {
            return customReferenceSpace || referenceSpace;
        };
        this.setReferenceSpace = function(space) {
            customReferenceSpace = space;
        };
        this.getBaseLayer = function() {
            return glProjLayer !== null ? glProjLayer : glBaseLayer;
        };
        this.getBinding = function() {
            return glBinding;
        };
        this.getFrame = function() {
            return xrFrame;
        };
        this.getSession = function() {
            return session;
        };
        this.setSession = async function(value) {
            session = value;
            if (session !== null) {
                initialRenderTarget = renderer.getRenderTarget();
                session.addEventListener('select', onSessionEvent);
                session.addEventListener('selectstart', onSessionEvent);
                session.addEventListener('selectend', onSessionEvent);
                session.addEventListener('squeeze', onSessionEvent);
                session.addEventListener('squeezestart', onSessionEvent);
                session.addEventListener('squeezeend', onSessionEvent);
                session.addEventListener('end', onSessionEnd);
                session.addEventListener('inputsourceschange', onInputSourcesChange);
                if (attributes.xrCompatible !== true) {
                    await gl.makeXRCompatible();
                }
                if (session.renderState.layers === undefined || renderer.capabilities.isWebGL2 === false) {
                    const layerInit = {
                        antialias: session.renderState.layers === undefined ? attributes.antialias : true,
                        alpha: attributes.alpha,
                        depth: attributes.depth,
                        stencil: attributes.stencil,
                        framebufferScaleFactor: framebufferScaleFactor
                    };
                    glBaseLayer = new XRWebGLLayer(session, gl, layerInit);
                    session.updateRenderState({
                        baseLayer: glBaseLayer
                    });
                    newRenderTarget = new WebGLRenderTarget(glBaseLayer.framebufferWidth, glBaseLayer.framebufferHeight, {
                        format: RGBAFormat,
                        type: UnsignedByteType,
                        encoding: renderer.outputEncoding,
                        stencilBuffer: attributes.stencil
                    });
                } else {
                    let depthFormat = null;
                    let depthType = null;
                    let glDepthFormat = null;
                    if (attributes.depth) {
                        glDepthFormat = attributes.stencil ? 35056 : 33190;
                        depthFormat = attributes.stencil ? DepthStencilFormat : DepthFormat;
                        depthType = attributes.stencil ? UnsignedInt248Type : UnsignedIntType;
                    }
                    const projectionlayerInit = {
                        colorFormat: 32856,
                        depthFormat: glDepthFormat,
                        scaleFactor: framebufferScaleFactor
                    };
                    glBinding = new XRWebGLBinding(session, gl);
                    glProjLayer = glBinding.createProjectionLayer(projectionlayerInit);
                    session.updateRenderState({
                        layers: [
                            glProjLayer
                        ]
                    });
                    newRenderTarget = new WebGLRenderTarget(glProjLayer.textureWidth, glProjLayer.textureHeight, {
                        format: RGBAFormat,
                        type: UnsignedByteType,
                        depthTexture: new DepthTexture(glProjLayer.textureWidth, glProjLayer.textureHeight, depthType, undefined, undefined, undefined, undefined, undefined, undefined, depthFormat),
                        stencilBuffer: attributes.stencil,
                        encoding: renderer.outputEncoding,
                        samples: attributes.antialias ? 4 : 0
                    });
                    const renderTargetProperties = renderer.properties.get(newRenderTarget);
                    renderTargetProperties.__ignoreDepthValues = glProjLayer.ignoreDepthValues;
                }
                newRenderTarget.isXRRenderTarget = true;
                this.setFoveation(foveation);
                customReferenceSpace = null;
                referenceSpace = await session.requestReferenceSpace(referenceSpaceType);
                animation.setContext(session);
                animation.start();
                scope.isPresenting = true;
                scope.dispatchEvent({
                    type: 'sessionstart'
                });
            }
        };
        function onInputSourcesChange(event) {
            for(let i = 0; i < event.removed.length; i++){
                const inputSource = event.removed[i];
                const index = controllerInputSources.indexOf(inputSource);
                if (index >= 0) {
                    controllerInputSources[index] = null;
                    controllers[index].disconnect(inputSource);
                }
            }
            for(let i1 = 0; i1 < event.added.length; i1++){
                const inputSource1 = event.added[i1];
                let controllerIndex = controllerInputSources.indexOf(inputSource1);
                if (controllerIndex === -1) {
                    for(let i2 = 0; i2 < controllers.length; i2++){
                        if (i2 >= controllerInputSources.length) {
                            controllerInputSources.push(inputSource1);
                            controllerIndex = i2;
                            break;
                        } else if (controllerInputSources[i2] === null) {
                            controllerInputSources[i2] = inputSource1;
                            controllerIndex = i2;
                            break;
                        }
                    }
                    if (controllerIndex === -1) break;
                }
                const controller = controllers[controllerIndex];
                if (controller) {
                    controller.connect(inputSource1);
                }
            }
        }
        const cameraLPos = new Vector3();
        const cameraRPos = new Vector3();
        function setProjectionFromUnion(camera, cameraL, cameraR) {
            cameraLPos.setFromMatrixPosition(cameraL.matrixWorld);
            cameraRPos.setFromMatrixPosition(cameraR.matrixWorld);
            const ipd = cameraLPos.distanceTo(cameraRPos);
            const projL = cameraL.projectionMatrix.elements;
            const projR = cameraR.projectionMatrix.elements;
            const near = projL[14] / (projL[10] - 1);
            const far = projL[14] / (projL[10] + 1);
            const topFov = (projL[9] + 1) / projL[5];
            const bottomFov = (projL[9] - 1) / projL[5];
            const leftFov = (projL[8] - 1) / projL[0];
            const rightFov = (projR[8] + 1) / projR[0];
            const left = near * leftFov;
            const right = near * rightFov;
            const zOffset = ipd / (-leftFov + rightFov);
            const xOffset = zOffset * -leftFov;
            cameraL.matrixWorld.decompose(camera.position, camera.quaternion, camera.scale);
            camera.translateX(xOffset);
            camera.translateZ(zOffset);
            camera.matrixWorld.compose(camera.position, camera.quaternion, camera.scale);
            camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
            const near2 = near + zOffset;
            const far2 = far + zOffset;
            const left2 = left - xOffset;
            const right2 = right + (ipd - xOffset);
            const top2 = topFov * far / far2 * near2;
            const bottom2 = bottomFov * far / far2 * near2;
            camera.projectionMatrix.makePerspective(left2, right2, top2, bottom2, near2, far2);
            camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
        }
        function updateCamera(camera, parent) {
            if (parent === null) {
                camera.matrixWorld.copy(camera.matrix);
            } else {
                camera.matrixWorld.multiplyMatrices(parent.matrixWorld, camera.matrix);
            }
            camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
        }
        this.updateCamera = function(camera) {
            if (session === null) return;
            cameraVR.near = cameraR.near = cameraL.near = camera.near;
            cameraVR.far = cameraR.far = cameraL.far = camera.far;
            if (_currentDepthNear !== cameraVR.near || _currentDepthFar !== cameraVR.far) {
                session.updateRenderState({
                    depthNear: cameraVR.near,
                    depthFar: cameraVR.far
                });
                _currentDepthNear = cameraVR.near;
                _currentDepthFar = cameraVR.far;
            }
            const parent = camera.parent;
            const cameras = cameraVR.cameras;
            updateCamera(cameraVR, parent);
            for(let i = 0; i < cameras.length; i++){
                updateCamera(cameras[i], parent);
            }
            if (cameras.length === 2) {
                setProjectionFromUnion(cameraVR, cameraL, cameraR);
            } else {
                cameraVR.projectionMatrix.copy(cameraL.projectionMatrix);
            }
            updateUserCamera(camera, cameraVR, parent);
        };
        function updateUserCamera(camera, cameraVR, parent) {
            if (parent === null) {
                camera.matrix.copy(cameraVR.matrixWorld);
            } else {
                camera.matrix.copy(parent.matrixWorld);
                camera.matrix.invert();
                camera.matrix.multiply(cameraVR.matrixWorld);
            }
            camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
            camera.updateMatrixWorld(true);
            const children = camera.children;
            for(let i = 0, l = children.length; i < l; i++){
                children[i].updateMatrixWorld(true);
            }
            camera.projectionMatrix.copy(cameraVR.projectionMatrix);
            camera.projectionMatrixInverse.copy(cameraVR.projectionMatrixInverse);
            if (camera.isPerspectiveCamera) {
                camera.fov = RAD2DEG * 2 * Math.atan(1 / camera.projectionMatrix.elements[5]);
                camera.zoom = 1;
            }
        }
        this.getCamera = function() {
            return cameraVR;
        };
        this.getFoveation = function() {
            if (glProjLayer === null && glBaseLayer === null) {
                return undefined;
            }
            return foveation;
        };
        this.setFoveation = function(value) {
            foveation = value;
            if (glProjLayer !== null) {
                glProjLayer.fixedFoveation = value;
            }
            if (glBaseLayer !== null && glBaseLayer.fixedFoveation !== undefined) {
                glBaseLayer.fixedFoveation = value;
            }
        };
        this.getPlanes = function() {
            return planes;
        };
        let onAnimationFrameCallback = null;
        function onAnimationFrame(time, frame) {
            pose = frame.getViewerPose(customReferenceSpace || referenceSpace);
            xrFrame = frame;
            if (pose !== null) {
                const views = pose.views;
                if (glBaseLayer !== null) {
                    renderer.setRenderTargetFramebuffer(newRenderTarget, glBaseLayer.framebuffer);
                    renderer.setRenderTarget(newRenderTarget);
                }
                let cameraVRNeedsUpdate = false;
                if (views.length !== cameraVR.cameras.length) {
                    cameraVR.cameras.length = 0;
                    cameraVRNeedsUpdate = true;
                }
                for(let i = 0; i < views.length; i++){
                    const view = views[i];
                    let viewport = null;
                    if (glBaseLayer !== null) {
                        viewport = glBaseLayer.getViewport(view);
                    } else {
                        const glSubImage = glBinding.getViewSubImage(glProjLayer, view);
                        viewport = glSubImage.viewport;
                        if (i === 0) {
                            renderer.setRenderTargetTextures(newRenderTarget, glSubImage.colorTexture, glProjLayer.ignoreDepthValues ? undefined : glSubImage.depthStencilTexture);
                            renderer.setRenderTarget(newRenderTarget);
                        }
                    }
                    let camera = cameras[i];
                    if (camera === undefined) {
                        camera = new PerspectiveCamera();
                        camera.layers.enable(i);
                        camera.viewport = new Vector4();
                        cameras[i] = camera;
                    }
                    camera.matrix.fromArray(view.transform.matrix);
                    camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
                    camera.projectionMatrix.fromArray(view.projectionMatrix);
                    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
                    camera.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);
                    if (i === 0) {
                        cameraVR.matrix.copy(camera.matrix);
                        cameraVR.matrix.decompose(cameraVR.position, cameraVR.quaternion, cameraVR.scale);
                    }
                    if (cameraVRNeedsUpdate === true) {
                        cameraVR.cameras.push(camera);
                    }
                }
            }
            for(let i1 = 0; i1 < controllers.length; i1++){
                const inputSource = controllerInputSources[i1];
                const controller = controllers[i1];
                if (inputSource !== null && controller !== undefined) {
                    controller.update(inputSource, frame, customReferenceSpace || referenceSpace);
                }
            }
            if (onAnimationFrameCallback) onAnimationFrameCallback(time, frame);
            if (frame.detectedPlanes) {
                scope.dispatchEvent({
                    type: 'planesdetected',
                    data: frame.detectedPlanes
                });
                let planesToRemove = null;
                for (const plane of planes){
                    if (!frame.detectedPlanes.has(plane)) {
                        if (planesToRemove === null) {
                            planesToRemove = [];
                        }
                        planesToRemove.push(plane);
                    }
                }
                if (planesToRemove !== null) {
                    for (const plane1 of planesToRemove){
                        planes.delete(plane1);
                        planesLastChangedTimes.delete(plane1);
                        scope.dispatchEvent({
                            type: 'planeremoved',
                            data: plane1
                        });
                    }
                }
                for (const plane2 of frame.detectedPlanes){
                    if (!planes.has(plane2)) {
                        planes.add(plane2);
                        planesLastChangedTimes.set(plane2, frame.lastChangedTime);
                        scope.dispatchEvent({
                            type: 'planeadded',
                            data: plane2
                        });
                    } else {
                        const lastKnownTime = planesLastChangedTimes.get(plane2);
                        if (plane2.lastChangedTime > lastKnownTime) {
                            planesLastChangedTimes.set(plane2, plane2.lastChangedTime);
                            scope.dispatchEvent({
                                type: 'planechanged',
                                data: plane2
                            });
                        }
                    }
                }
            }
            xrFrame = null;
        }
        const animation = new WebGLAnimation();
        animation.setAnimationLoop(onAnimationFrame);
        this.setAnimationLoop = function(callback) {
            onAnimationFrameCallback = callback;
        };
        this.dispose = function() {};
    }
}
function WebGLMaterials(renderer, properties) {
    function refreshTransformUniform(map, uniform) {
        if (map.matrixAutoUpdate === true) {
            map.updateMatrix();
        }
        uniform.value.copy(map.matrix);
    }
    function refreshFogUniforms(uniforms, fog) {
        fog.color.getRGB(uniforms.fogColor.value, getUnlitUniformColorSpace(renderer));
        if (fog.isFog) {
            uniforms.fogNear.value = fog.near;
            uniforms.fogFar.value = fog.far;
        } else if (fog.isFogExp2) {
            uniforms.fogDensity.value = fog.density;
        }
    }
    function refreshMaterialUniforms(uniforms, material, pixelRatio, height, transmissionRenderTarget) {
        if (material.isMeshBasicMaterial) {
            refreshUniformsCommon(uniforms, material);
        } else if (material.isMeshLambertMaterial) {
            refreshUniformsCommon(uniforms, material);
        } else if (material.isMeshToonMaterial) {
            refreshUniformsCommon(uniforms, material);
            refreshUniformsToon(uniforms, material);
        } else if (material.isMeshPhongMaterial) {
            refreshUniformsCommon(uniforms, material);
            refreshUniformsPhong(uniforms, material);
        } else if (material.isMeshStandardMaterial) {
            refreshUniformsCommon(uniforms, material);
            refreshUniformsStandard(uniforms, material);
            if (material.isMeshPhysicalMaterial) {
                refreshUniformsPhysical(uniforms, material, transmissionRenderTarget);
            }
        } else if (material.isMeshMatcapMaterial) {
            refreshUniformsCommon(uniforms, material);
            refreshUniformsMatcap(uniforms, material);
        } else if (material.isMeshDepthMaterial) {
            refreshUniformsCommon(uniforms, material);
        } else if (material.isMeshDistanceMaterial) {
            refreshUniformsCommon(uniforms, material);
            refreshUniformsDistance(uniforms, material);
        } else if (material.isMeshNormalMaterial) {
            refreshUniformsCommon(uniforms, material);
        } else if (material.isLineBasicMaterial) {
            refreshUniformsLine(uniforms, material);
            if (material.isLineDashedMaterial) {
                refreshUniformsDash(uniforms, material);
            }
        } else if (material.isPointsMaterial) {
            refreshUniformsPoints(uniforms, material, pixelRatio, height);
        } else if (material.isSpriteMaterial) {
            refreshUniformsSprites(uniforms, material);
        } else if (material.isShadowMaterial) {
            uniforms.color.value.copy(material.color);
            uniforms.opacity.value = material.opacity;
        } else if (material.isShaderMaterial) {
            material.uniformsNeedUpdate = false;
        }
    }
    function refreshUniformsCommon(uniforms, material) {
        uniforms.opacity.value = material.opacity;
        if (material.color) {
            uniforms.diffuse.value.copy(material.color);
        }
        if (material.emissive) {
            uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
        }
        if (material.map) {
            uniforms.map.value = material.map;
            refreshTransformUniform(material.map, uniforms.mapTransform);
        }
        if (material.alphaMap) {
            uniforms.alphaMap.value = material.alphaMap;
            refreshTransformUniform(material.alphaMap, uniforms.alphaMapTransform);
        }
        if (material.bumpMap) {
            uniforms.bumpMap.value = material.bumpMap;
            refreshTransformUniform(material.bumpMap, uniforms.bumpMapTransform);
            uniforms.bumpScale.value = material.bumpScale;
            if (material.side === 1) {
                uniforms.bumpScale.value *= -1;
            }
        }
        if (material.normalMap) {
            uniforms.normalMap.value = material.normalMap;
            refreshTransformUniform(material.normalMap, uniforms.normalMapTransform);
            uniforms.normalScale.value.copy(material.normalScale);
            if (material.side === 1) {
                uniforms.normalScale.value.negate();
            }
        }
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            refreshTransformUniform(material.displacementMap, uniforms.displacementMapTransform);
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
        if (material.emissiveMap) {
            uniforms.emissiveMap.value = material.emissiveMap;
            refreshTransformUniform(material.emissiveMap, uniforms.emissiveMapTransform);
        }
        if (material.specularMap) {
            uniforms.specularMap.value = material.specularMap;
            refreshTransformUniform(material.specularMap, uniforms.specularMapTransform);
        }
        if (material.alphaTest > 0) {
            uniforms.alphaTest.value = material.alphaTest;
        }
        const envMap = properties.get(material).envMap;
        if (envMap) {
            uniforms.envMap.value = envMap;
            uniforms.flipEnvMap.value = envMap.isCubeTexture && envMap.isRenderTargetTexture === false ? -1 : 1;
            uniforms.reflectivity.value = material.reflectivity;
            uniforms.ior.value = material.ior;
            uniforms.refractionRatio.value = material.refractionRatio;
        }
        if (material.lightMap) {
            uniforms.lightMap.value = material.lightMap;
            const scaleFactor = renderer.useLegacyLights === true ? Math.PI : 1;
            uniforms.lightMapIntensity.value = material.lightMapIntensity * scaleFactor;
            refreshTransformUniform(material.lightMap, uniforms.lightMapTransform);
        }
        if (material.aoMap) {
            uniforms.aoMap.value = material.aoMap;
            uniforms.aoMapIntensity.value = material.aoMapIntensity;
            refreshTransformUniform(material.aoMap, uniforms.aoMapTransform);
        }
    }
    function refreshUniformsLine(uniforms, material) {
        uniforms.diffuse.value.copy(material.color);
        uniforms.opacity.value = material.opacity;
        if (material.map) {
            uniforms.map.value = material.map;
            refreshTransformUniform(material.map, uniforms.mapTransform);
        }
    }
    function refreshUniformsDash(uniforms, material) {
        uniforms.dashSize.value = material.dashSize;
        uniforms.totalSize.value = material.dashSize + material.gapSize;
        uniforms.scale.value = material.scale;
    }
    function refreshUniformsPoints(uniforms, material, pixelRatio, height) {
        uniforms.diffuse.value.copy(material.color);
        uniforms.opacity.value = material.opacity;
        uniforms.size.value = material.size * pixelRatio;
        uniforms.scale.value = height * 0.5;
        if (material.map) {
            uniforms.map.value = material.map;
            refreshTransformUniform(material.map, uniforms.uvTransform);
        }
        if (material.alphaMap) {
            uniforms.alphaMap.value = material.alphaMap;
        }
        if (material.alphaTest > 0) {
            uniforms.alphaTest.value = material.alphaTest;
        }
    }
    function refreshUniformsSprites(uniforms, material) {
        uniforms.diffuse.value.copy(material.color);
        uniforms.opacity.value = material.opacity;
        uniforms.rotation.value = material.rotation;
        if (material.map) {
            uniforms.map.value = material.map;
            refreshTransformUniform(material.map, uniforms.mapTransform);
        }
        if (material.alphaMap) {
            uniforms.alphaMap.value = material.alphaMap;
        }
        if (material.alphaTest > 0) {
            uniforms.alphaTest.value = material.alphaTest;
        }
    }
    function refreshUniformsPhong(uniforms, material) {
        uniforms.specular.value.copy(material.specular);
        uniforms.shininess.value = Math.max(material.shininess, 1e-4);
    }
    function refreshUniformsToon(uniforms, material) {
        if (material.gradientMap) {
            uniforms.gradientMap.value = material.gradientMap;
        }
    }
    function refreshUniformsStandard(uniforms, material) {
        uniforms.metalness.value = material.metalness;
        if (material.metalnessMap) {
            uniforms.metalnessMap.value = material.metalnessMap;
            refreshTransformUniform(material.metalnessMap, uniforms.metalnessMapTransform);
        }
        uniforms.roughness.value = material.roughness;
        if (material.roughnessMap) {
            uniforms.roughnessMap.value = material.roughnessMap;
            refreshTransformUniform(material.roughnessMap, uniforms.roughnessMapTransform);
        }
        const envMap = properties.get(material).envMap;
        if (envMap) {
            uniforms.envMapIntensity.value = material.envMapIntensity;
        }
    }
    function refreshUniformsPhysical(uniforms, material, transmissionRenderTarget) {
        uniforms.ior.value = material.ior;
        if (material.sheen > 0) {
            uniforms.sheenColor.value.copy(material.sheenColor).multiplyScalar(material.sheen);
            uniforms.sheenRoughness.value = material.sheenRoughness;
            if (material.sheenColorMap) {
                uniforms.sheenColorMap.value = material.sheenColorMap;
                refreshTransformUniform(material.sheenColorMap, uniforms.sheenColorMapTransform);
            }
            if (material.sheenRoughnessMap) {
                uniforms.sheenRoughnessMap.value = material.sheenRoughnessMap;
                refreshTransformUniform(material.sheenRoughnessMap, uniforms.sheenRoughnessMapTransform);
            }
        }
        if (material.clearcoat > 0) {
            uniforms.clearcoat.value = material.clearcoat;
            uniforms.clearcoatRoughness.value = material.clearcoatRoughness;
            if (material.clearcoatMap) {
                uniforms.clearcoatMap.value = material.clearcoatMap;
                refreshTransformUniform(material.clearcoatMap, uniforms.clearcoatMapTransform);
            }
            if (material.clearcoatRoughnessMap) {
                uniforms.clearcoatRoughnessMap.value = material.clearcoatRoughnessMap;
                refreshTransformUniform(material.clearcoatRoughnessMap, uniforms.clearcoatRoughnessMapTransform);
            }
            if (material.clearcoatNormalMap) {
                uniforms.clearcoatNormalMap.value = material.clearcoatNormalMap;
                refreshTransformUniform(material.clearcoatNormalMap, uniforms.clearcoatNormalMapTransform);
                uniforms.clearcoatNormalScale.value.copy(material.clearcoatNormalScale);
                if (material.side === 1) {
                    uniforms.clearcoatNormalScale.value.negate();
                }
            }
        }
        if (material.iridescence > 0) {
            uniforms.iridescence.value = material.iridescence;
            uniforms.iridescenceIOR.value = material.iridescenceIOR;
            uniforms.iridescenceThicknessMinimum.value = material.iridescenceThicknessRange[0];
            uniforms.iridescenceThicknessMaximum.value = material.iridescenceThicknessRange[1];
            if (material.iridescenceMap) {
                uniforms.iridescenceMap.value = material.iridescenceMap;
                refreshTransformUniform(material.iridescenceMap, uniforms.iridescenceMapTransform);
            }
            if (material.iridescenceThicknessMap) {
                uniforms.iridescenceThicknessMap.value = material.iridescenceThicknessMap;
                refreshTransformUniform(material.iridescenceThicknessMap, uniforms.iridescenceThicknessMapTransform);
            }
        }
        if (material.transmission > 0) {
            uniforms.transmission.value = material.transmission;
            uniforms.transmissionSamplerMap.value = transmissionRenderTarget.texture;
            uniforms.transmissionSamplerSize.value.set(transmissionRenderTarget.width, transmissionRenderTarget.height);
            if (material.transmissionMap) {
                uniforms.transmissionMap.value = material.transmissionMap;
                refreshTransformUniform(material.transmissionMap, uniforms.transmissionMapTransform);
            }
            uniforms.thickness.value = material.thickness;
            if (material.thicknessMap) {
                uniforms.thicknessMap.value = material.thicknessMap;
                refreshTransformUniform(material.thicknessMap, uniforms.thicknessMapTransform);
            }
            uniforms.attenuationDistance.value = material.attenuationDistance;
            uniforms.attenuationColor.value.copy(material.attenuationColor);
        }
        uniforms.specularIntensity.value = material.specularIntensity;
        uniforms.specularColor.value.copy(material.specularColor);
        if (material.specularColorMap) {
            uniforms.specularColorMap.value = material.specularColorMap;
            refreshTransformUniform(material.specularColorMap, uniforms.specularColorMapTransform);
        }
        if (material.specularIntensityMap) {
            uniforms.specularIntensityMap.value = material.specularIntensityMap;
            refreshTransformUniform(material.specularIntensityMap, uniforms.specularIntensityMapTransform);
        }
    }
    function refreshUniformsMatcap(uniforms, material) {
        if (material.matcap) {
            uniforms.matcap.value = material.matcap;
        }
    }
    function refreshUniformsDistance(uniforms, material) {
        const light = properties.get(material).light;
        uniforms.referencePosition.value.setFromMatrixPosition(light.matrixWorld);
        uniforms.nearDistance.value = light.shadow.camera.near;
        uniforms.farDistance.value = light.shadow.camera.far;
    }
    return {
        refreshFogUniforms: refreshFogUniforms,
        refreshMaterialUniforms: refreshMaterialUniforms
    };
}
function WebGLUniformsGroups(gl, info, capabilities, state) {
    let buffers = {};
    let updateList = {};
    let allocatedBindingPoints = [];
    const maxBindingPoints = capabilities.isWebGL2 ? gl.getParameter(35375) : 0;
    function bind(uniformsGroup, program) {
        const webglProgram = program.program;
        state.uniformBlockBinding(uniformsGroup, webglProgram);
    }
    function update(uniformsGroup, program) {
        let buffer = buffers[uniformsGroup.id];
        if (buffer === undefined) {
            prepareUniformsGroup(uniformsGroup);
            buffer = createBuffer(uniformsGroup);
            buffers[uniformsGroup.id] = buffer;
            uniformsGroup.addEventListener('dispose', onUniformsGroupsDispose);
        }
        const webglProgram = program.program;
        state.updateUBOMapping(uniformsGroup, webglProgram);
        const frame = info.render.frame;
        if (updateList[uniformsGroup.id] !== frame) {
            updateBufferData(uniformsGroup);
            updateList[uniformsGroup.id] = frame;
        }
    }
    function createBuffer(uniformsGroup) {
        const bindingPointIndex = allocateBindingPointIndex();
        uniformsGroup.__bindingPointIndex = bindingPointIndex;
        const buffer = gl.createBuffer();
        const size = uniformsGroup.__size;
        const usage = uniformsGroup.usage;
        gl.bindBuffer(35345, buffer);
        gl.bufferData(35345, size, usage);
        gl.bindBuffer(35345, null);
        gl.bindBufferBase(35345, bindingPointIndex, buffer);
        return buffer;
    }
    function allocateBindingPointIndex() {
        for(let i = 0; i < maxBindingPoints; i++){
            if (allocatedBindingPoints.indexOf(i) === -1) {
                allocatedBindingPoints.push(i);
                return i;
            }
        }
        console.error('THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.');
        return 0;
    }
    function updateBufferData(uniformsGroup) {
        const buffer = buffers[uniformsGroup.id];
        const uniforms = uniformsGroup.uniforms;
        const cache = uniformsGroup.__cache;
        gl.bindBuffer(35345, buffer);
        for(let i = 0, il = uniforms.length; i < il; i++){
            const uniform = uniforms[i];
            if (hasUniformChanged(uniform, i, cache) === true) {
                const offset = uniform.__offset;
                const values = Array.isArray(uniform.value) ? uniform.value : [
                    uniform.value
                ];
                let arrayOffset = 0;
                for(let i1 = 0; i1 < values.length; i1++){
                    const value = values[i1];
                    const info = getUniformSize(value);
                    if (typeof value === 'number') {
                        uniform.__data[0] = value;
                        gl.bufferSubData(35345, offset + arrayOffset, uniform.__data);
                    } else if (value.isMatrix3) {
                        uniform.__data[0] = value.elements[0];
                        uniform.__data[1] = value.elements[1];
                        uniform.__data[2] = value.elements[2];
                        uniform.__data[3] = value.elements[0];
                        uniform.__data[4] = value.elements[3];
                        uniform.__data[5] = value.elements[4];
                        uniform.__data[6] = value.elements[5];
                        uniform.__data[7] = value.elements[0];
                        uniform.__data[8] = value.elements[6];
                        uniform.__data[9] = value.elements[7];
                        uniform.__data[10] = value.elements[8];
                        uniform.__data[11] = value.elements[0];
                    } else {
                        value.toArray(uniform.__data, arrayOffset);
                        arrayOffset += info.storage / Float32Array.BYTES_PER_ELEMENT;
                    }
                }
                gl.bufferSubData(35345, offset, uniform.__data);
            }
        }
        gl.bindBuffer(35345, null);
    }
    function hasUniformChanged(uniform, index, cache) {
        const value = uniform.value;
        if (cache[index] === undefined) {
            if (typeof value === 'number') {
                cache[index] = value;
            } else {
                const values = Array.isArray(value) ? value : [
                    value
                ];
                const tempValues = [];
                for(let i = 0; i < values.length; i++){
                    tempValues.push(values[i].clone());
                }
                cache[index] = tempValues;
            }
            return true;
        } else {
            if (typeof value === 'number') {
                if (cache[index] !== value) {
                    cache[index] = value;
                    return true;
                }
            } else {
                const cachedObjects = Array.isArray(cache[index]) ? cache[index] : [
                    cache[index]
                ];
                const values1 = Array.isArray(value) ? value : [
                    value
                ];
                for(let i1 = 0; i1 < cachedObjects.length; i1++){
                    const cachedObject = cachedObjects[i1];
                    if (cachedObject.equals(values1[i1]) === false) {
                        cachedObject.copy(values1[i1]);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function prepareUniformsGroup(uniformsGroup) {
        const uniforms = uniformsGroup.uniforms;
        let offset = 0;
        const chunkSize = 16;
        let chunkOffset = 0;
        for(let i = 0, l = uniforms.length; i < l; i++){
            const uniform = uniforms[i];
            const infos = {
                boundary: 0,
                storage: 0
            };
            const values = Array.isArray(uniform.value) ? uniform.value : [
                uniform.value
            ];
            for(let j = 0, jl = values.length; j < jl; j++){
                const value = values[j];
                const info = getUniformSize(value);
                infos.boundary += info.boundary;
                infos.storage += info.storage;
            }
            uniform.__data = new Float32Array(infos.storage / Float32Array.BYTES_PER_ELEMENT);
            uniform.__offset = offset;
            if (i > 0) {
                chunkOffset = offset % chunkSize;
                const remainingSizeInChunk = 16 - chunkOffset;
                if (chunkOffset !== 0 && remainingSizeInChunk - infos.boundary < 0) {
                    offset += chunkSize - chunkOffset;
                    uniform.__offset = offset;
                }
            }
            offset += infos.storage;
        }
        chunkOffset = offset % chunkSize;
        if (chunkOffset > 0) offset += chunkSize - chunkOffset;
        uniformsGroup.__size = offset;
        uniformsGroup.__cache = {};
        return this;
    }
    function getUniformSize(value) {
        const info = {
            boundary: 0,
            storage: 0
        };
        if (typeof value === 'number') {
            info.boundary = 4;
            info.storage = 4;
        } else if (value.isVector2) {
            info.boundary = 8;
            info.storage = 8;
        } else if (value.isVector3 || value.isColor) {
            info.boundary = 16;
            info.storage = 12;
        } else if (value.isVector4) {
            info.boundary = 16;
            info.storage = 16;
        } else if (value.isMatrix3) {
            info.boundary = 48;
            info.storage = 48;
        } else if (value.isMatrix4) {
            info.boundary = 64;
            info.storage = 64;
        } else if (value.isTexture) {
            console.warn('THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.');
        } else {
            console.warn('THREE.WebGLRenderer: Unsupported uniform value type.', value);
        }
        return info;
    }
    function onUniformsGroupsDispose(event) {
        const uniformsGroup = event.target;
        uniformsGroup.removeEventListener('dispose', onUniformsGroupsDispose);
        const index = allocatedBindingPoints.indexOf(uniformsGroup.__bindingPointIndex);
        allocatedBindingPoints.splice(index, 1);
        gl.deleteBuffer(buffers[uniformsGroup.id]);
        delete buffers[uniformsGroup.id];
        delete updateList[uniformsGroup.id];
    }
    function dispose() {
        for(const id in buffers){
            gl.deleteBuffer(buffers[id]);
        }
        allocatedBindingPoints = [];
        buffers = {};
        updateList = {};
    }
    return {
        bind: bind,
        update: update,
        dispose: dispose
    };
}
function createCanvasElement() {
    const canvas = createElementNS('canvas');
    canvas.style.display = 'block';
    return canvas;
}
class WebGLRenderer {
    constructor(parameters = {}){
        const { canvas =createCanvasElement() , context =null , depth =true , stencil =true , alpha =false , antialias =false , premultipliedAlpha =true , preserveDrawingBuffer =false , powerPreference ='default' , failIfMajorPerformanceCaveat =false  } = parameters;
        this.isWebGLRenderer = true;
        let _alpha;
        if (context !== null) {
            _alpha = context.getContextAttributes().alpha;
        } else {
            _alpha = alpha;
        }
        let currentRenderList = null;
        let currentRenderState = null;
        const renderListStack = [];
        const renderStateStack = [];
        this.domElement = canvas;
        this.debug = {
            checkShaderErrors: true,
            onShaderError: null
        };
        this.autoClear = true;
        this.autoClearColor = true;
        this.autoClearDepth = true;
        this.autoClearStencil = true;
        this.sortObjects = true;
        this.clippingPlanes = [];
        this.localClippingEnabled = false;
        this.outputEncoding = LinearEncoding;
        this.useLegacyLights = true;
        this.toneMapping = NoToneMapping;
        this.toneMappingExposure = 1.0;
        const _this = this;
        let _isContextLost = false;
        let _currentActiveCubeFace = 0;
        let _currentActiveMipmapLevel = 0;
        let _currentRenderTarget = null;
        let _currentMaterialId = -1;
        let _currentCamera = null;
        const _currentViewport = new Vector4();
        const _currentScissor = new Vector4();
        let _currentScissorTest = null;
        let _width = canvas.width;
        let _height = canvas.height;
        let _pixelRatio = 1;
        let _opaqueSort = null;
        let _transparentSort = null;
        const _viewport = new Vector4(0, 0, _width, _height);
        const _scissor = new Vector4(0, 0, _width, _height);
        let _scissorTest = false;
        const _frustum = new Frustum();
        let _clippingEnabled = false;
        let _localClippingEnabled = false;
        let _transmissionRenderTarget = null;
        const _projScreenMatrix = new Matrix4();
        const _vector3 = new Vector3();
        const _emptyScene = {
            background: null,
            fog: null,
            environment: null,
            overrideMaterial: null,
            isScene: true
        };
        function getTargetPixelRatio() {
            return _currentRenderTarget === null ? _pixelRatio : 1;
        }
        let _gl = context;
        function getContext(contextNames, contextAttributes) {
            for(let i = 0; i < contextNames.length; i++){
                const contextName = contextNames[i];
                const context = canvas.getContext(contextName, contextAttributes);
                if (context !== null) return context;
            }
            return null;
        }
        try {
            const contextAttributes = {
                alpha: true,
                depth,
                stencil,
                antialias,
                premultipliedAlpha,
                preserveDrawingBuffer,
                powerPreference,
                failIfMajorPerformanceCaveat
            };
            if ('setAttribute' in canvas) canvas.setAttribute('data-engine', `three.js r${REVISION}`);
            canvas.addEventListener('webglcontextlost', onContextLost, false);
            canvas.addEventListener('webglcontextrestored', onContextRestore, false);
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            if (_gl === null) {
                const contextNames = [
                    'webgl2',
                    'webgl',
                    'experimental-webgl'
                ];
                if (_this.isWebGL1Renderer === true) {
                    contextNames.shift();
                }
                _gl = getContext(contextNames, contextAttributes);
                if (_gl === null) {
                    if (getContext(contextNames)) {
                        throw new Error('Error creating WebGL context with your selected attributes.');
                    } else {
                        throw new Error('Error creating WebGL context.');
                    }
                }
            }
            if (_gl.getShaderPrecisionFormat === undefined) {
                _gl.getShaderPrecisionFormat = function() {
                    return {
                        'rangeMin': 1,
                        'rangeMax': 1,
                        'precision': 1
                    };
                };
            }
        } catch (error) {
            console.error('THREE.WebGLRenderer: ' + error.message);
            throw error;
        }
        let extensions, capabilities, state, info;
        let properties, textures, cubemaps, cubeuvmaps, attributes, geometries, objects;
        let programCache, materials, renderLists, renderStates, clipping, shadowMap;
        let background, morphtargets, bufferRenderer, indexedBufferRenderer;
        let utils, bindingStates, uniformsGroups;
        function initGLContext() {
            extensions = new WebGLExtensions(_gl);
            capabilities = new WebGLCapabilities(_gl, extensions, parameters);
            extensions.init(capabilities);
            utils = new WebGLUtils(_gl, extensions, capabilities);
            state = new WebGLState(_gl, extensions, capabilities);
            info = new WebGLInfo();
            properties = new WebGLProperties();
            textures = new WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info);
            cubemaps = new WebGLCubeMaps(_this);
            cubeuvmaps = new WebGLCubeUVMaps(_this);
            attributes = new WebGLAttributes(_gl, capabilities);
            bindingStates = new WebGLBindingStates(_gl, extensions, attributes, capabilities);
            geometries = new WebGLGeometries(_gl, attributes, info, bindingStates);
            objects = new WebGLObjects(_gl, geometries, attributes, info);
            morphtargets = new WebGLMorphtargets(_gl, capabilities, textures);
            clipping = new WebGLClipping(properties);
            programCache = new WebGLPrograms(_this, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping);
            materials = new WebGLMaterials(_this, properties);
            renderLists = new WebGLRenderLists();
            renderStates = new WebGLRenderStates(extensions, capabilities);
            background = new WebGLBackground(_this, cubemaps, cubeuvmaps, state, objects, _alpha, premultipliedAlpha);
            shadowMap = new WebGLShadowMap(_this, objects, capabilities);
            uniformsGroups = new WebGLUniformsGroups(_gl, info, capabilities, state);
            bufferRenderer = new WebGLBufferRenderer(_gl, extensions, info, capabilities);
            indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, extensions, info, capabilities);
            info.programs = programCache.programs;
            _this.capabilities = capabilities;
            _this.extensions = extensions;
            _this.properties = properties;
            _this.renderLists = renderLists;
            _this.shadowMap = shadowMap;
            _this.state = state;
            _this.info = info;
        }
        initGLContext();
        const xr = new WebXRManager(_this, _gl);
        this.xr = xr;
        this.getContext = function() {
            return _gl;
        };
        this.getContextAttributes = function() {
            return _gl.getContextAttributes();
        };
        this.forceContextLoss = function() {
            const extension = extensions.get('WEBGL_lose_context');
            if (extension) extension.loseContext();
        };
        this.forceContextRestore = function() {
            const extension = extensions.get('WEBGL_lose_context');
            if (extension) extension.restoreContext();
        };
        this.getPixelRatio = function() {
            return _pixelRatio;
        };
        this.setPixelRatio = function(value) {
            if (value === undefined) return;
            _pixelRatio = value;
            this.setSize(_width, _height, false);
        };
        this.getSize = function(target) {
            return target.set(_width, _height);
        };
        this.setSize = function(width, height, updateStyle = true) {
            if (xr.isPresenting) {
                console.warn('THREE.WebGLRenderer: Can\'t change size while VR device is presenting.');
                return;
            }
            _width = width;
            _height = height;
            canvas.width = Math.floor(width * _pixelRatio);
            canvas.height = Math.floor(height * _pixelRatio);
            if (updateStyle === true) {
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
            }
            this.setViewport(0, 0, width, height);
        };
        this.getDrawingBufferSize = function(target) {
            return target.set(_width * _pixelRatio, _height * _pixelRatio).floor();
        };
        this.setDrawingBufferSize = function(width, height, pixelRatio) {
            _width = width;
            _height = height;
            _pixelRatio = pixelRatio;
            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            this.setViewport(0, 0, width, height);
        };
        this.getCurrentViewport = function(target) {
            return target.copy(_currentViewport);
        };
        this.getViewport = function(target) {
            return target.copy(_viewport);
        };
        this.setViewport = function(x, y, width, height) {
            if (x.isVector4) {
                _viewport.set(x.x, x.y, x.z, x.w);
            } else {
                _viewport.set(x, y, width, height);
            }
            state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio).floor());
        };
        this.getScissor = function(target) {
            return target.copy(_scissor);
        };
        this.setScissor = function(x, y, width, height) {
            if (x.isVector4) {
                _scissor.set(x.x, x.y, x.z, x.w);
            } else {
                _scissor.set(x, y, width, height);
            }
            state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).floor());
        };
        this.getScissorTest = function() {
            return _scissorTest;
        };
        this.setScissorTest = function(__boolean) {
            state.setScissorTest(_scissorTest = __boolean);
        };
        this.setOpaqueSort = function(method) {
            _opaqueSort = method;
        };
        this.setTransparentSort = function(method) {
            _transparentSort = method;
        };
        this.getClearColor = function(target) {
            return target.copy(background.getClearColor());
        };
        this.setClearColor = function() {
            background.setClearColor.apply(background, arguments);
        };
        this.getClearAlpha = function() {
            return background.getClearAlpha();
        };
        this.setClearAlpha = function() {
            background.setClearAlpha.apply(background, arguments);
        };
        this.clear = function(color = true, depth = true, stencil = true) {
            let bits = 0;
            if (color) bits |= 16384;
            if (depth) bits |= 256;
            if (stencil) bits |= 1024;
            _gl.clear(bits);
        };
        this.clearColor = function() {
            this.clear(true, false, false);
        };
        this.clearDepth = function() {
            this.clear(false, true, false);
        };
        this.clearStencil = function() {
            this.clear(false, false, true);
        };
        this.dispose = function() {
            canvas.removeEventListener('webglcontextlost', onContextLost, false);
            canvas.removeEventListener('webglcontextrestored', onContextRestore, false);
            canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            renderLists.dispose();
            renderStates.dispose();
            properties.dispose();
            cubemaps.dispose();
            cubeuvmaps.dispose();
            objects.dispose();
            bindingStates.dispose();
            uniformsGroups.dispose();
            programCache.dispose();
            xr.dispose();
            xr.removeEventListener('sessionstart', onXRSessionStart);
            xr.removeEventListener('sessionend', onXRSessionEnd);
            if (_transmissionRenderTarget) {
                _transmissionRenderTarget.dispose();
                _transmissionRenderTarget = null;
            }
            animation.stop();
        };
        function onContextLost(event) {
            event.preventDefault();
            console.log('THREE.WebGLRenderer: Context Lost.');
            _isContextLost = true;
        }
        function onContextRestore() {
            console.log('THREE.WebGLRenderer: Context Restored.');
            _isContextLost = false;
            const infoAutoReset = info.autoReset;
            const shadowMapEnabled = shadowMap.enabled;
            const shadowMapAutoUpdate = shadowMap.autoUpdate;
            const shadowMapNeedsUpdate = shadowMap.needsUpdate;
            const shadowMapType = shadowMap.type;
            initGLContext();
            info.autoReset = infoAutoReset;
            shadowMap.enabled = shadowMapEnabled;
            shadowMap.autoUpdate = shadowMapAutoUpdate;
            shadowMap.needsUpdate = shadowMapNeedsUpdate;
            shadowMap.type = shadowMapType;
        }
        function onContextCreationError(event) {
            console.error('THREE.WebGLRenderer: A WebGL context could not be created. Reason: ', event.statusMessage);
        }
        function onMaterialDispose(event) {
            const material = event.target;
            material.removeEventListener('dispose', onMaterialDispose);
            deallocateMaterial(material);
        }
        function deallocateMaterial(material) {
            releaseMaterialProgramReferences(material);
            properties.remove(material);
        }
        function releaseMaterialProgramReferences(material) {
            const programs = properties.get(material).programs;
            if (programs !== undefined) {
                programs.forEach(function(program) {
                    programCache.releaseProgram(program);
                });
                if (material.isShaderMaterial) {
                    programCache.releaseShaderCache(material);
                }
            }
        }
        this.renderBufferDirect = function(camera, scene, geometry, material, object, group) {
            if (scene === null) scene = _emptyScene;
            const frontFaceCW = object.isMesh && object.matrixWorld.determinant() < 0;
            const program = setProgram(camera, scene, geometry, material, object);
            state.setMaterial(material, frontFaceCW);
            let index = geometry.index;
            let rangeFactor = 1;
            if (material.wireframe === true) {
                index = geometries.getWireframeAttribute(geometry);
                rangeFactor = 2;
            }
            const drawRange = geometry.drawRange;
            const position = geometry.attributes.position;
            let drawStart = drawRange.start * rangeFactor;
            let drawEnd = (drawRange.start + drawRange.count) * rangeFactor;
            if (group !== null) {
                drawStart = Math.max(drawStart, group.start * rangeFactor);
                drawEnd = Math.min(drawEnd, (group.start + group.count) * rangeFactor);
            }
            if (index !== null) {
                drawStart = Math.max(drawStart, 0);
                drawEnd = Math.min(drawEnd, index.count);
            } else if (position !== undefined && position !== null) {
                drawStart = Math.max(drawStart, 0);
                drawEnd = Math.min(drawEnd, position.count);
            }
            const drawCount = drawEnd - drawStart;
            if (drawCount < 0 || drawCount === Infinity) return;
            bindingStates.setup(object, material, program, geometry, index);
            let attribute;
            let renderer = bufferRenderer;
            if (index !== null) {
                attribute = attributes.get(index);
                renderer = indexedBufferRenderer;
                renderer.setIndex(attribute);
            }
            if (object.isMesh) {
                if (material.wireframe === true) {
                    state.setLineWidth(material.wireframeLinewidth * getTargetPixelRatio());
                    renderer.setMode(1);
                } else {
                    renderer.setMode(4);
                }
            } else if (object.isLine) {
                let lineWidth = material.linewidth;
                if (lineWidth === undefined) lineWidth = 1;
                state.setLineWidth(lineWidth * getTargetPixelRatio());
                if (object.isLineSegments) {
                    renderer.setMode(1);
                } else if (object.isLineLoop) {
                    renderer.setMode(2);
                } else {
                    renderer.setMode(3);
                }
            } else if (object.isPoints) {
                renderer.setMode(0);
            } else if (object.isSprite) {
                renderer.setMode(4);
            }
            if (object.isInstancedMesh) {
                renderer.renderInstances(drawStart, drawCount, object.count);
            } else if (geometry.isInstancedBufferGeometry) {
                const maxInstanceCount = geometry._maxInstanceCount !== undefined ? geometry._maxInstanceCount : Infinity;
                const instanceCount = Math.min(geometry.instanceCount, maxInstanceCount);
                renderer.renderInstances(drawStart, drawCount, instanceCount);
            } else {
                renderer.render(drawStart, drawCount);
            }
        };
        this.compile = function(scene, camera) {
            function prepare(material, scene, object) {
                if (material.transparent === true && material.side === DoubleSide && material.forceSinglePass === false) {
                    material.side = BackSide;
                    material.needsUpdate = true;
                    getProgram(material, scene, object);
                    material.side = FrontSide;
                    material.needsUpdate = true;
                    getProgram(material, scene, object);
                    material.side = DoubleSide;
                } else {
                    getProgram(material, scene, object);
                }
            }
            currentRenderState = renderStates.get(scene);
            currentRenderState.init();
            renderStateStack.push(currentRenderState);
            scene.traverseVisible(function(object) {
                if (object.isLight && object.layers.test(camera.layers)) {
                    currentRenderState.pushLight(object);
                    if (object.castShadow) {
                        currentRenderState.pushShadow(object);
                    }
                }
            });
            currentRenderState.setupLights(_this.useLegacyLights);
            scene.traverse(function(object) {
                const material = object.material;
                if (material) {
                    if (Array.isArray(material)) {
                        for(let i = 0; i < material.length; i++){
                            const material2 = material[i];
                            prepare(material2, scene, object);
                        }
                    } else {
                        prepare(material, scene, object);
                    }
                }
            });
            renderStateStack.pop();
            currentRenderState = null;
        };
        let onAnimationFrameCallback = null;
        function onAnimationFrame(time) {
            if (onAnimationFrameCallback) onAnimationFrameCallback(time);
        }
        function onXRSessionStart() {
            animation.stop();
        }
        function onXRSessionEnd() {
            animation.start();
        }
        const animation = new WebGLAnimation();
        animation.setAnimationLoop(onAnimationFrame);
        if (typeof self !== 'undefined') animation.setContext(self);
        this.setAnimationLoop = function(callback) {
            onAnimationFrameCallback = callback;
            xr.setAnimationLoop(callback);
            callback === null ? animation.stop() : animation.start();
        };
        xr.addEventListener('sessionstart', onXRSessionStart);
        xr.addEventListener('sessionend', onXRSessionEnd);
        this.render = function(scene, camera) {
            if (camera !== undefined && camera.isCamera !== true) {
                console.error('THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.');
                return;
            }
            if (_isContextLost === true) return;
            if (scene.matrixWorldAutoUpdate === true) scene.updateMatrixWorld();
            if (camera.parent === null && camera.matrixWorldAutoUpdate === true) camera.updateMatrixWorld();
            if (xr.enabled === true && xr.isPresenting === true) {
                if (xr.cameraAutoUpdate === true) xr.updateCamera(camera);
                camera = xr.getCamera();
            }
            if (scene.isScene === true) scene.onBeforeRender(_this, scene, camera, _currentRenderTarget);
            currentRenderState = renderStates.get(scene, renderStateStack.length);
            currentRenderState.init();
            renderStateStack.push(currentRenderState);
            _projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
            _frustum.setFromProjectionMatrix(_projScreenMatrix);
            _localClippingEnabled = this.localClippingEnabled;
            _clippingEnabled = clipping.init(this.clippingPlanes, _localClippingEnabled);
            currentRenderList = renderLists.get(scene, renderListStack.length);
            currentRenderList.init();
            renderListStack.push(currentRenderList);
            projectObject(scene, camera, 0, _this.sortObjects);
            currentRenderList.finish();
            if (_this.sortObjects === true) {
                currentRenderList.sort(_opaqueSort, _transparentSort);
            }
            if (_clippingEnabled === true) clipping.beginShadows();
            const shadowsArray = currentRenderState.state.shadowsArray;
            shadowMap.render(shadowsArray, scene, camera);
            if (_clippingEnabled === true) clipping.endShadows();
            if (this.info.autoReset === true) this.info.reset();
            background.render(currentRenderList, scene);
            currentRenderState.setupLights(_this.useLegacyLights);
            if (camera.isArrayCamera) {
                const cameras = camera.cameras;
                for(let i = 0, l = cameras.length; i < l; i++){
                    const camera2 = cameras[i];
                    renderScene(currentRenderList, scene, camera2, camera2.viewport);
                }
            } else {
                renderScene(currentRenderList, scene, camera);
            }
            if (_currentRenderTarget !== null) {
                textures.updateMultisampleRenderTarget(_currentRenderTarget);
                textures.updateRenderTargetMipmap(_currentRenderTarget);
            }
            if (scene.isScene === true) scene.onAfterRender(_this, scene, camera);
            bindingStates.resetDefaultState();
            _currentMaterialId = -1;
            _currentCamera = null;
            renderStateStack.pop();
            if (renderStateStack.length > 0) {
                currentRenderState = renderStateStack[renderStateStack.length - 1];
            } else {
                currentRenderState = null;
            }
            renderListStack.pop();
            if (renderListStack.length > 0) {
                currentRenderList = renderListStack[renderListStack.length - 1];
            } else {
                currentRenderList = null;
            }
        };
        function projectObject(object, camera, groupOrder, sortObjects) {
            if (object.visible === false) return;
            const visible = object.layers.test(camera.layers);
            if (visible) {
                if (object.isGroup) {
                    groupOrder = object.renderOrder;
                } else if (object.isLOD) {
                    if (object.autoUpdate === true) object.update(camera);
                } else if (object.isLight) {
                    currentRenderState.pushLight(object);
                    if (object.castShadow) {
                        currentRenderState.pushShadow(object);
                    }
                } else if (object.isSprite) {
                    if (!object.frustumCulled || _frustum.intersectsSprite(object)) {
                        if (sortObjects) {
                            _vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(_projScreenMatrix);
                        }
                        const geometry = objects.update(object);
                        const material = object.material;
                        if (material.visible) {
                            currentRenderList.push(object, geometry, material, groupOrder, _vector3.z, null);
                        }
                    }
                } else if (object.isMesh || object.isLine || object.isPoints) {
                    if (object.isSkinnedMesh) {
                        if (object.skeleton.frame !== info.render.frame) {
                            object.skeleton.update();
                            object.skeleton.frame = info.render.frame;
                        }
                    }
                    if (!object.frustumCulled || _frustum.intersectsObject(object)) {
                        if (sortObjects) {
                            _vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(_projScreenMatrix);
                        }
                        const geometry1 = objects.update(object);
                        const material1 = object.material;
                        if (Array.isArray(material1)) {
                            const groups = geometry1.groups;
                            for(let i = 0, l = groups.length; i < l; i++){
                                const group = groups[i];
                                const groupMaterial = material1[group.materialIndex];
                                if (groupMaterial && groupMaterial.visible) {
                                    currentRenderList.push(object, geometry1, groupMaterial, groupOrder, _vector3.z, group);
                                }
                            }
                        } else if (material1.visible) {
                            currentRenderList.push(object, geometry1, material1, groupOrder, _vector3.z, null);
                        }
                    }
                }
            }
            const children = object.children;
            for(let i1 = 0, l1 = children.length; i1 < l1; i1++){
                projectObject(children[i1], camera, groupOrder, sortObjects);
            }
        }
        function renderScene(currentRenderList, scene, camera, viewport) {
            const opaqueObjects = currentRenderList.opaque;
            const transmissiveObjects = currentRenderList.transmissive;
            const transparentObjects = currentRenderList.transparent;
            currentRenderState.setupLightsView(camera);
            if (_clippingEnabled === true) clipping.setGlobalState(_this.clippingPlanes, camera);
            if (transmissiveObjects.length > 0) renderTransmissionPass(opaqueObjects, transmissiveObjects, scene, camera);
            if (viewport) state.viewport(_currentViewport.copy(viewport));
            if (opaqueObjects.length > 0) renderObjects(opaqueObjects, scene, camera);
            if (transmissiveObjects.length > 0) renderObjects(transmissiveObjects, scene, camera);
            if (transparentObjects.length > 0) renderObjects(transparentObjects, scene, camera);
            state.buffers.depth.setTest(true);
            state.buffers.depth.setMask(true);
            state.buffers.color.setMask(true);
            state.setPolygonOffset(false);
        }
        function renderTransmissionPass(opaqueObjects, transmissiveObjects, scene, camera) {
            if (_transmissionRenderTarget === null) {
                const isWebGL2 = capabilities.isWebGL2;
                _transmissionRenderTarget = new WebGLRenderTarget(1024, 1024, {
                    generateMipmaps: true,
                    type: extensions.has('EXT_color_buffer_half_float') ? HalfFloatType : UnsignedByteType,
                    minFilter: LinearMipmapLinearFilter,
                    samples: isWebGL2 && antialias === true ? 4 : 0
                });
            }
            const currentRenderTarget = _this.getRenderTarget();
            _this.setRenderTarget(_transmissionRenderTarget);
            _this.clear();
            const currentToneMapping = _this.toneMapping;
            _this.toneMapping = NoToneMapping;
            renderObjects(opaqueObjects, scene, camera);
            textures.updateMultisampleRenderTarget(_transmissionRenderTarget);
            textures.updateRenderTargetMipmap(_transmissionRenderTarget);
            let renderTargetNeedsUpdate = false;
            for(let i = 0, l = transmissiveObjects.length; i < l; i++){
                const renderItem = transmissiveObjects[i];
                const object = renderItem.object;
                const geometry = renderItem.geometry;
                const material = renderItem.material;
                const group = renderItem.group;
                if (material.side === 2 && object.layers.test(camera.layers)) {
                    const currentSide = material.side;
                    material.side = BackSide;
                    material.needsUpdate = true;
                    renderObject(object, scene, camera, geometry, material, group);
                    material.side = currentSide;
                    material.needsUpdate = true;
                    renderTargetNeedsUpdate = true;
                }
            }
            if (renderTargetNeedsUpdate === true) {
                textures.updateMultisampleRenderTarget(_transmissionRenderTarget);
                textures.updateRenderTargetMipmap(_transmissionRenderTarget);
            }
            _this.setRenderTarget(currentRenderTarget);
            _this.toneMapping = currentToneMapping;
        }
        function renderObjects(renderList, scene, camera) {
            const overrideMaterial = scene.isScene === true ? scene.overrideMaterial : null;
            for(let i = 0, l = renderList.length; i < l; i++){
                const renderItem = renderList[i];
                const object = renderItem.object;
                const geometry = renderItem.geometry;
                const material = overrideMaterial === null ? renderItem.material : overrideMaterial;
                const group = renderItem.group;
                if (object.layers.test(camera.layers)) {
                    renderObject(object, scene, camera, geometry, material, group);
                }
            }
        }
        function renderObject(object, scene, camera, geometry, material, group) {
            object.onBeforeRender(_this, scene, camera, geometry, material, group);
            object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
            object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
            material.onBeforeRender(_this, scene, camera, geometry, object, group);
            if (material.transparent === true && material.side === 2 && material.forceSinglePass === false) {
                material.side = BackSide;
                material.needsUpdate = true;
                _this.renderBufferDirect(camera, scene, geometry, material, object, group);
                material.side = FrontSide;
                material.needsUpdate = true;
                _this.renderBufferDirect(camera, scene, geometry, material, object, group);
                material.side = DoubleSide;
            } else {
                _this.renderBufferDirect(camera, scene, geometry, material, object, group);
            }
            object.onAfterRender(_this, scene, camera, geometry, material, group);
        }
        function getProgram(material, scene, object) {
            if (scene.isScene !== true) scene = _emptyScene;
            const materialProperties = properties.get(material);
            const lights = currentRenderState.state.lights;
            const shadowsArray = currentRenderState.state.shadowsArray;
            const lightsStateVersion = lights.state.version;
            const parameters = programCache.getParameters(material, lights.state, shadowsArray, scene, object);
            const programCacheKey = programCache.getProgramCacheKey(parameters);
            let programs = materialProperties.programs;
            materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
            materialProperties.fog = scene.fog;
            materialProperties.envMap = (material.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material.envMap || materialProperties.environment);
            if (programs === undefined) {
                material.addEventListener('dispose', onMaterialDispose);
                programs = new Map();
                materialProperties.programs = programs;
            }
            let program = programs.get(programCacheKey);
            if (program !== undefined) {
                if (materialProperties.currentProgram === program && materialProperties.lightsStateVersion === lightsStateVersion) {
                    updateCommonMaterialProperties(material, parameters);
                    return program;
                }
            } else {
                parameters.uniforms = programCache.getUniforms(material);
                material.onBuild(object, parameters, _this);
                material.onBeforeCompile(parameters, _this);
                program = programCache.acquireProgram(parameters, programCacheKey);
                programs.set(programCacheKey, program);
                materialProperties.uniforms = parameters.uniforms;
            }
            const uniforms = materialProperties.uniforms;
            if (!material.isShaderMaterial && !material.isRawShaderMaterial || material.clipping === true) {
                uniforms.clippingPlanes = clipping.uniform;
            }
            updateCommonMaterialProperties(material, parameters);
            materialProperties.needsLights = materialNeedsLights(material);
            materialProperties.lightsStateVersion = lightsStateVersion;
            if (materialProperties.needsLights) {
                uniforms.ambientLightColor.value = lights.state.ambient;
                uniforms.lightProbe.value = lights.state.probe;
                uniforms.directionalLights.value = lights.state.directional;
                uniforms.directionalLightShadows.value = lights.state.directionalShadow;
                uniforms.spotLights.value = lights.state.spot;
                uniforms.spotLightShadows.value = lights.state.spotShadow;
                uniforms.rectAreaLights.value = lights.state.rectArea;
                uniforms.ltc_1.value = lights.state.rectAreaLTC1;
                uniforms.ltc_2.value = lights.state.rectAreaLTC2;
                uniforms.pointLights.value = lights.state.point;
                uniforms.pointLightShadows.value = lights.state.pointShadow;
                uniforms.hemisphereLights.value = lights.state.hemi;
                uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
                uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
                uniforms.spotShadowMap.value = lights.state.spotShadowMap;
                uniforms.spotLightMatrix.value = lights.state.spotLightMatrix;
                uniforms.spotLightMap.value = lights.state.spotLightMap;
                uniforms.pointShadowMap.value = lights.state.pointShadowMap;
                uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
            }
            const progUniforms = program.getUniforms();
            const uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);
            materialProperties.currentProgram = program;
            materialProperties.uniformsList = uniformsList;
            return program;
        }
        function updateCommonMaterialProperties(material, parameters) {
            const materialProperties = properties.get(material);
            materialProperties.outputEncoding = parameters.outputEncoding;
            materialProperties.instancing = parameters.instancing;
            materialProperties.skinning = parameters.skinning;
            materialProperties.morphTargets = parameters.morphTargets;
            materialProperties.morphNormals = parameters.morphNormals;
            materialProperties.morphColors = parameters.morphColors;
            materialProperties.morphTargetsCount = parameters.morphTargetsCount;
            materialProperties.numClippingPlanes = parameters.numClippingPlanes;
            materialProperties.numIntersection = parameters.numClipIntersection;
            materialProperties.vertexAlphas = parameters.vertexAlphas;
            materialProperties.vertexTangents = parameters.vertexTangents;
            materialProperties.toneMapping = parameters.toneMapping;
        }
        function setProgram(camera, scene, geometry, material, object) {
            if (scene.isScene !== true) scene = _emptyScene;
            textures.resetTextureUnits();
            const fog = scene.fog;
            const environment = material.isMeshStandardMaterial ? scene.environment : null;
            const encoding = _currentRenderTarget === null ? _this.outputEncoding : _currentRenderTarget.isXRRenderTarget === true ? _currentRenderTarget.texture.encoding : 3000;
            const envMap = (material.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material.envMap || environment);
            const vertexAlphas = material.vertexColors === true && !!geometry.attributes.color && geometry.attributes.color.itemSize === 4;
            const vertexTangents = !!material.normalMap && !!geometry.attributes.tangent;
            const morphTargets = !!geometry.morphAttributes.position;
            const morphNormals = !!geometry.morphAttributes.normal;
            const morphColors = !!geometry.morphAttributes.color;
            const toneMapping = material.toneMapped ? _this.toneMapping : 0;
            const morphAttribute = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color;
            const morphTargetsCount = morphAttribute !== undefined ? morphAttribute.length : 0;
            const materialProperties = properties.get(material);
            const lights = currentRenderState.state.lights;
            if (_clippingEnabled === true) {
                if (_localClippingEnabled === true || camera !== _currentCamera) {
                    const useCache = camera === _currentCamera && material.id === _currentMaterialId;
                    clipping.setState(material, camera, useCache);
                }
            }
            let needsProgramChange = false;
            if (material.version === materialProperties.__version) {
                if (materialProperties.needsLights && materialProperties.lightsStateVersion !== lights.state.version) {
                    needsProgramChange = true;
                } else if (materialProperties.outputEncoding !== encoding) {
                    needsProgramChange = true;
                } else if (object.isInstancedMesh && materialProperties.instancing === false) {
                    needsProgramChange = true;
                } else if (!object.isInstancedMesh && materialProperties.instancing === true) {
                    needsProgramChange = true;
                } else if (object.isSkinnedMesh && materialProperties.skinning === false) {
                    needsProgramChange = true;
                } else if (!object.isSkinnedMesh && materialProperties.skinning === true) {
                    needsProgramChange = true;
                } else if (materialProperties.envMap !== envMap) {
                    needsProgramChange = true;
                } else if (material.fog === true && materialProperties.fog !== fog) {
                    needsProgramChange = true;
                } else if (materialProperties.numClippingPlanes !== undefined && (materialProperties.numClippingPlanes !== clipping.numPlanes || materialProperties.numIntersection !== clipping.numIntersection)) {
                    needsProgramChange = true;
                } else if (materialProperties.vertexAlphas !== vertexAlphas) {
                    needsProgramChange = true;
                } else if (materialProperties.vertexTangents !== vertexTangents) {
                    needsProgramChange = true;
                } else if (materialProperties.morphTargets !== morphTargets) {
                    needsProgramChange = true;
                } else if (materialProperties.morphNormals !== morphNormals) {
                    needsProgramChange = true;
                } else if (materialProperties.morphColors !== morphColors) {
                    needsProgramChange = true;
                } else if (materialProperties.toneMapping !== toneMapping) {
                    needsProgramChange = true;
                } else if (capabilities.isWebGL2 === true && materialProperties.morphTargetsCount !== morphTargetsCount) {
                    needsProgramChange = true;
                }
            } else {
                needsProgramChange = true;
                materialProperties.__version = material.version;
            }
            let program = materialProperties.currentProgram;
            if (needsProgramChange === true) {
                program = getProgram(material, scene, object);
            }
            let refreshProgram = false;
            let refreshMaterial = false;
            let refreshLights = false;
            const p_uniforms = program.getUniforms(), m_uniforms = materialProperties.uniforms;
            if (state.useProgram(program.program)) {
                refreshProgram = true;
                refreshMaterial = true;
                refreshLights = true;
            }
            if (material.id !== _currentMaterialId) {
                _currentMaterialId = material.id;
                refreshMaterial = true;
            }
            if (refreshProgram || _currentCamera !== camera) {
                p_uniforms.setValue(_gl, 'projectionMatrix', camera.projectionMatrix);
                if (capabilities.logarithmicDepthBuffer) {
                    p_uniforms.setValue(_gl, 'logDepthBufFC', 2.0 / (Math.log(camera.far + 1.0) / Math.LN2));
                }
                if (_currentCamera !== camera) {
                    _currentCamera = camera;
                    refreshMaterial = true;
                    refreshLights = true;
                }
                if (material.isShaderMaterial || material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshStandardMaterial || material.envMap) {
                    const uCamPos = p_uniforms.map.cameraPosition;
                    if (uCamPos !== undefined) {
                        uCamPos.setValue(_gl, _vector3.setFromMatrixPosition(camera.matrixWorld));
                    }
                }
                if (material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshLambertMaterial || material.isMeshBasicMaterial || material.isMeshStandardMaterial || material.isShaderMaterial) {
                    p_uniforms.setValue(_gl, 'isOrthographic', camera.isOrthographicCamera === true);
                }
                if (material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshLambertMaterial || material.isMeshBasicMaterial || material.isMeshStandardMaterial || material.isShaderMaterial || material.isShadowMaterial || object.isSkinnedMesh) {
                    p_uniforms.setValue(_gl, 'viewMatrix', camera.matrixWorldInverse);
                }
            }
            if (object.isSkinnedMesh) {
                p_uniforms.setOptional(_gl, object, 'bindMatrix');
                p_uniforms.setOptional(_gl, object, 'bindMatrixInverse');
                const skeleton = object.skeleton;
                if (skeleton) {
                    if (capabilities.floatVertexTextures) {
                        if (skeleton.boneTexture === null) skeleton.computeBoneTexture();
                        p_uniforms.setValue(_gl, 'boneTexture', skeleton.boneTexture, textures);
                        p_uniforms.setValue(_gl, 'boneTextureSize', skeleton.boneTextureSize);
                    } else {
                        console.warn('THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.');
                    }
                }
            }
            const morphAttributes = geometry.morphAttributes;
            if (morphAttributes.position !== undefined || morphAttributes.normal !== undefined || morphAttributes.color !== undefined && capabilities.isWebGL2 === true) {
                morphtargets.update(object, geometry, program);
            }
            if (refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow) {
                materialProperties.receiveShadow = object.receiveShadow;
                p_uniforms.setValue(_gl, 'receiveShadow', object.receiveShadow);
            }
            if (material.isMeshGouraudMaterial && material.envMap !== null) {
                m_uniforms.envMap.value = envMap;
                m_uniforms.flipEnvMap.value = envMap.isCubeTexture && envMap.isRenderTargetTexture === false ? -1 : 1;
            }
            if (refreshMaterial) {
                p_uniforms.setValue(_gl, 'toneMappingExposure', _this.toneMappingExposure);
                if (materialProperties.needsLights) {
                    markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
                }
                if (fog && material.fog === true) {
                    materials.refreshFogUniforms(m_uniforms, fog);
                }
                materials.refreshMaterialUniforms(m_uniforms, material, _pixelRatio, _height, _transmissionRenderTarget);
                WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
            }
            if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {
                WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
                material.uniformsNeedUpdate = false;
            }
            if (material.isSpriteMaterial) {
                p_uniforms.setValue(_gl, 'center', object.center);
            }
            p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
            p_uniforms.setValue(_gl, 'normalMatrix', object.normalMatrix);
            p_uniforms.setValue(_gl, 'modelMatrix', object.matrixWorld);
            if (material.isShaderMaterial || material.isRawShaderMaterial) {
                const groups = material.uniformsGroups;
                for(let i = 0, l = groups.length; i < l; i++){
                    if (capabilities.isWebGL2) {
                        const group = groups[i];
                        uniformsGroups.update(group, program);
                        uniformsGroups.bind(group, program);
                    } else {
                        console.warn('THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.');
                    }
                }
            }
            return program;
        }
        function markUniformsLightsNeedsUpdate(uniforms, value) {
            uniforms.ambientLightColor.needsUpdate = value;
            uniforms.lightProbe.needsUpdate = value;
            uniforms.directionalLights.needsUpdate = value;
            uniforms.directionalLightShadows.needsUpdate = value;
            uniforms.pointLights.needsUpdate = value;
            uniforms.pointLightShadows.needsUpdate = value;
            uniforms.spotLights.needsUpdate = value;
            uniforms.spotLightShadows.needsUpdate = value;
            uniforms.rectAreaLights.needsUpdate = value;
            uniforms.hemisphereLights.needsUpdate = value;
        }
        function materialNeedsLights(material) {
            return material.isMeshLambertMaterial || material.isMeshToonMaterial || material.isMeshPhongMaterial || material.isMeshStandardMaterial || material.isShadowMaterial || material.isShaderMaterial && material.lights === true;
        }
        this.getActiveCubeFace = function() {
            return _currentActiveCubeFace;
        };
        this.getActiveMipmapLevel = function() {
            return _currentActiveMipmapLevel;
        };
        this.getRenderTarget = function() {
            return _currentRenderTarget;
        };
        this.setRenderTargetTextures = function(renderTarget, colorTexture, depthTexture) {
            properties.get(renderTarget.texture).__webglTexture = colorTexture;
            properties.get(renderTarget.depthTexture).__webglTexture = depthTexture;
            const renderTargetProperties = properties.get(renderTarget);
            renderTargetProperties.__hasExternalTextures = true;
            if (renderTargetProperties.__hasExternalTextures) {
                renderTargetProperties.__autoAllocateDepthBuffer = depthTexture === undefined;
                if (!renderTargetProperties.__autoAllocateDepthBuffer) {
                    if (extensions.has('WEBGL_multisampled_render_to_texture') === true) {
                        console.warn('THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided');
                        renderTargetProperties.__useRenderToTexture = false;
                    }
                }
            }
        };
        this.setRenderTargetFramebuffer = function(renderTarget, defaultFramebuffer) {
            const renderTargetProperties = properties.get(renderTarget);
            renderTargetProperties.__webglFramebuffer = defaultFramebuffer;
            renderTargetProperties.__useDefaultFramebuffer = defaultFramebuffer === undefined;
        };
        this.setRenderTarget = function(renderTarget, activeCubeFace = 0, activeMipmapLevel = 0) {
            _currentRenderTarget = renderTarget;
            _currentActiveCubeFace = activeCubeFace;
            _currentActiveMipmapLevel = activeMipmapLevel;
            let useDefaultFramebuffer = true;
            let framebuffer = null;
            let isCube = false;
            let isRenderTarget3D = false;
            if (renderTarget) {
                const renderTargetProperties = properties.get(renderTarget);
                if (renderTargetProperties.__useDefaultFramebuffer !== undefined) {
                    state.bindFramebuffer(36160, null);
                    useDefaultFramebuffer = false;
                } else if (renderTargetProperties.__webglFramebuffer === undefined) {
                    textures.setupRenderTarget(renderTarget);
                } else if (renderTargetProperties.__hasExternalTextures) {
                    textures.rebindTextures(renderTarget, properties.get(renderTarget.texture).__webglTexture, properties.get(renderTarget.depthTexture).__webglTexture);
                }
                const texture = renderTarget.texture;
                if (texture.isData3DTexture || texture.isDataArrayTexture || texture.isCompressedArrayTexture) {
                    isRenderTarget3D = true;
                }
                const __webglFramebuffer = properties.get(renderTarget).__webglFramebuffer;
                if (renderTarget.isWebGLCubeRenderTarget) {
                    framebuffer = __webglFramebuffer[activeCubeFace];
                    isCube = true;
                } else if (capabilities.isWebGL2 && renderTarget.samples > 0 && textures.useMultisampledRTT(renderTarget) === false) {
                    framebuffer = properties.get(renderTarget).__webglMultisampledFramebuffer;
                } else {
                    framebuffer = __webglFramebuffer;
                }
                _currentViewport.copy(renderTarget.viewport);
                _currentScissor.copy(renderTarget.scissor);
                _currentScissorTest = renderTarget.scissorTest;
            } else {
                _currentViewport.copy(_viewport).multiplyScalar(_pixelRatio).floor();
                _currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).floor();
                _currentScissorTest = _scissorTest;
            }
            const framebufferBound = state.bindFramebuffer(36160, framebuffer);
            if (framebufferBound && capabilities.drawBuffers && useDefaultFramebuffer) {
                state.drawBuffers(renderTarget, framebuffer);
            }
            state.viewport(_currentViewport);
            state.scissor(_currentScissor);
            state.setScissorTest(_currentScissorTest);
            if (isCube) {
                const textureProperties = properties.get(renderTarget.texture);
                _gl.framebufferTexture2D(36160, 36064, 34069 + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel);
            } else if (isRenderTarget3D) {
                const textureProperties1 = properties.get(renderTarget.texture);
                const layer = activeCubeFace || 0;
                _gl.framebufferTextureLayer(36160, 36064, textureProperties1.__webglTexture, activeMipmapLevel || 0, layer);
            }
            _currentMaterialId = -1;
        };
        this.readRenderTargetPixels = function(renderTarget, x, y, width, height, buffer, activeCubeFaceIndex) {
            if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
                console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');
                return;
            }
            let framebuffer = properties.get(renderTarget).__webglFramebuffer;
            if (renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== undefined) {
                framebuffer = framebuffer[activeCubeFaceIndex];
            }
            if (framebuffer) {
                state.bindFramebuffer(36160, framebuffer);
                try {
                    const texture = renderTarget.texture;
                    const textureFormat = texture.format;
                    const textureType = texture.type;
                    if (textureFormat !== RGBAFormat && utils.convert(textureFormat) !== _gl.getParameter(35739)) {
                        console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.');
                        return;
                    }
                    const halfFloatSupportedByExt = textureType === HalfFloatType && (extensions.has('EXT_color_buffer_half_float') || capabilities.isWebGL2 && extensions.has('EXT_color_buffer_float'));
                    if (textureType !== UnsignedByteType && utils.convert(textureType) !== _gl.getParameter(35738) && !(textureType === FloatType && (capabilities.isWebGL2 || extensions.has('OES_texture_float') || extensions.has('WEBGL_color_buffer_float'))) && !halfFloatSupportedByExt) {
                        console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.');
                        return;
                    }
                    if (x >= 0 && x <= renderTarget.width - width && y >= 0 && y <= renderTarget.height - height) {
                        _gl.readPixels(x, y, width, height, utils.convert(textureFormat), utils.convert(textureType), buffer);
                    }
                } finally{
                    const framebuffer1 = _currentRenderTarget !== null ? properties.get(_currentRenderTarget).__webglFramebuffer : null;
                    state.bindFramebuffer(36160, framebuffer1);
                }
            }
        };
        this.copyFramebufferToTexture = function(position, texture, level = 0) {
            const levelScale = Math.pow(2, -level);
            const width = Math.floor(texture.image.width * levelScale);
            const height = Math.floor(texture.image.height * levelScale);
            textures.setTexture2D(texture, 0);
            _gl.copyTexSubImage2D(3553, level, 0, 0, position.x, position.y, width, height);
            state.unbindTexture();
        };
        this.copyTextureToTexture = function(position, srcTexture, dstTexture, level = 0) {
            const width = srcTexture.image.width;
            const height = srcTexture.image.height;
            const glFormat = utils.convert(dstTexture.format);
            const glType = utils.convert(dstTexture.type);
            textures.setTexture2D(dstTexture, 0);
            _gl.pixelStorei(37440, dstTexture.flipY);
            _gl.pixelStorei(37441, dstTexture.premultiplyAlpha);
            _gl.pixelStorei(3317, dstTexture.unpackAlignment);
            if (srcTexture.isDataTexture) {
                _gl.texSubImage2D(3553, level, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data);
            } else {
                if (srcTexture.isCompressedTexture) {
                    _gl.compressedTexSubImage2D(3553, level, position.x, position.y, srcTexture.mipmaps[0].width, srcTexture.mipmaps[0].height, glFormat, srcTexture.mipmaps[0].data);
                } else {
                    _gl.texSubImage2D(3553, level, position.x, position.y, glFormat, glType, srcTexture.image);
                }
            }
            if (level === 0 && dstTexture.generateMipmaps) _gl.generateMipmap(3553);
            state.unbindTexture();
        };
        this.copyTextureToTexture3D = function(sourceBox, position, srcTexture, dstTexture, level = 0) {
            if (_this.isWebGL1Renderer) {
                console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.');
                return;
            }
            const width = sourceBox.max.x - sourceBox.min.x + 1;
            const height = sourceBox.max.y - sourceBox.min.y + 1;
            const depth = sourceBox.max.z - sourceBox.min.z + 1;
            const glFormat = utils.convert(dstTexture.format);
            const glType = utils.convert(dstTexture.type);
            let glTarget;
            if (dstTexture.isData3DTexture) {
                textures.setTexture3D(dstTexture, 0);
                glTarget = 32879;
            } else if (dstTexture.isDataArrayTexture) {
                textures.setTexture2DArray(dstTexture, 0);
                glTarget = 35866;
            } else {
                console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.');
                return;
            }
            _gl.pixelStorei(37440, dstTexture.flipY);
            _gl.pixelStorei(37441, dstTexture.premultiplyAlpha);
            _gl.pixelStorei(3317, dstTexture.unpackAlignment);
            const unpackRowLen = _gl.getParameter(3314);
            const unpackImageHeight = _gl.getParameter(32878);
            const unpackSkipPixels = _gl.getParameter(3316);
            const unpackSkipRows = _gl.getParameter(3315);
            const unpackSkipImages = _gl.getParameter(32877);
            const image = srcTexture.isCompressedTexture ? srcTexture.mipmaps[0] : srcTexture.image;
            _gl.pixelStorei(3314, image.width);
            _gl.pixelStorei(32878, image.height);
            _gl.pixelStorei(3316, sourceBox.min.x);
            _gl.pixelStorei(3315, sourceBox.min.y);
            _gl.pixelStorei(32877, sourceBox.min.z);
            if (srcTexture.isDataTexture || srcTexture.isData3DTexture) {
                _gl.texSubImage3D(glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, glType, image.data);
            } else {
                if (srcTexture.isCompressedArrayTexture) {
                    console.warn('THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.');
                    _gl.compressedTexSubImage3D(glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, image.data);
                } else {
                    _gl.texSubImage3D(glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, glType, image);
                }
            }
            _gl.pixelStorei(3314, unpackRowLen);
            _gl.pixelStorei(32878, unpackImageHeight);
            _gl.pixelStorei(3316, unpackSkipPixels);
            _gl.pixelStorei(3315, unpackSkipRows);
            _gl.pixelStorei(32877, unpackSkipImages);
            if (level === 0 && dstTexture.generateMipmaps) _gl.generateMipmap(glTarget);
            state.unbindTexture();
        };
        this.initTexture = function(texture) {
            if (texture.isCubeTexture) {
                textures.setTextureCube(texture, 0);
            } else if (texture.isData3DTexture) {
                textures.setTexture3D(texture, 0);
            } else if (texture.isDataArrayTexture || texture.isCompressedArrayTexture) {
                textures.setTexture2DArray(texture, 0);
            } else {
                textures.setTexture2D(texture, 0);
            }
            state.unbindTexture();
        };
        this.resetState = function() {
            _currentActiveCubeFace = 0;
            _currentActiveMipmapLevel = 0;
            _currentRenderTarget = null;
            state.reset();
            bindingStates.reset();
        };
        if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
            __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', {
                detail: this
            }));
        }
    }
    get physicallyCorrectLights() {
        console.warn('THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.');
        return !this.useLegacyLights;
    }
    set physicallyCorrectLights(value) {
        console.warn('THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.');
        this.useLegacyLights = !value;
    }
}
class WebGL1Renderer extends WebGLRenderer {
}
WebGL1Renderer.prototype.isWebGL1Renderer = true;
class Scene extends Object3D {
    constructor(){
        super();
        this.isScene = true;
        this.type = 'Scene';
        this.background = null;
        this.environment = null;
        this.fog = null;
        this.backgroundBlurriness = 0;
        this.backgroundIntensity = 1;
        this.overrideMaterial = null;
        if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
            __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', {
                detail: this
            }));
        }
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        if (source.background !== null) this.background = source.background.clone();
        if (source.environment !== null) this.environment = source.environment.clone();
        if (source.fog !== null) this.fog = source.fog.clone();
        this.backgroundBlurriness = source.backgroundBlurriness;
        this.backgroundIntensity = source.backgroundIntensity;
        if (source.overrideMaterial !== null) this.overrideMaterial = source.overrideMaterial.clone();
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        return this;
    }
    toJSON(meta) {
        const data = super.toJSON(meta);
        if (this.fog !== null) data.object.fog = this.fog.toJSON();
        if (this.backgroundBlurriness > 0) data.object.backgroundBlurriness = this.backgroundBlurriness;
        if (this.backgroundIntensity !== 1) data.object.backgroundIntensity = this.backgroundIntensity;
        return data;
    }
    get autoUpdate() {
        console.warn('THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144.');
        return this.matrixWorldAutoUpdate;
    }
    set autoUpdate(value) {
        console.warn('THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144.');
        this.matrixWorldAutoUpdate = value;
    }
}
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector2();
new Vector2();
new Matrix4();
new Vector3();
new Vector3();
new Vector3();
new Vector2();
new Vector2();
new Vector2();
new Vector3();
new Vector3();
new Vector3();
new Vector4();
new Vector4();
new Vector3();
new Matrix4();
new Vector3();
new Matrix4();
new Matrix4();
new Matrix4();
new Matrix4();
new Box3();
new Matrix4();
new Mesh();
new Sphere();
new Vector3();
new Vector3();
new Matrix4();
new Ray();
new Sphere();
new Vector3();
new Vector3();
new Matrix4();
new Ray();
new Sphere();
new Vector3();
class Curve {
    constructor(){
        this.type = 'Curve';
        this.arcLengthDivisions = 200;
    }
    getPoint() {
        console.warn('THREE.Curve: .getPoint() not implemented.');
        return null;
    }
    getPointAt(u, optionalTarget) {
        const t = this.getUtoTmapping(u);
        return this.getPoint(t, optionalTarget);
    }
    getPoints(divisions = 5) {
        const points = [];
        for(let d = 0; d <= divisions; d++){
            points.push(this.getPoint(d / divisions));
        }
        return points;
    }
    getSpacedPoints(divisions = 5) {
        const points = [];
        for(let d = 0; d <= divisions; d++){
            points.push(this.getPointAt(d / divisions));
        }
        return points;
    }
    getLength() {
        const lengths = this.getLengths();
        return lengths[lengths.length - 1];
    }
    getLengths(divisions = this.arcLengthDivisions) {
        if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate) {
            return this.cacheArcLengths;
        }
        this.needsUpdate = false;
        const cache = [];
        let current, last = this.getPoint(0);
        let sum = 0;
        cache.push(0);
        for(let p = 1; p <= divisions; p++){
            current = this.getPoint(p / divisions);
            sum += current.distanceTo(last);
            cache.push(sum);
            last = current;
        }
        this.cacheArcLengths = cache;
        return cache;
    }
    updateArcLengths() {
        this.needsUpdate = true;
        this.getLengths();
    }
    getUtoTmapping(u, distance) {
        const arcLengths = this.getLengths();
        let i = 0;
        const il = arcLengths.length;
        let targetArcLength;
        if (distance) {
            targetArcLength = distance;
        } else {
            targetArcLength = u * arcLengths[il - 1];
        }
        let low = 0, high = il - 1, comparison;
        while(low <= high){
            i = Math.floor(low + (high - low) / 2);
            comparison = arcLengths[i] - targetArcLength;
            if (comparison < 0) {
                low = i + 1;
            } else if (comparison > 0) {
                high = i - 1;
            } else {
                high = i;
                break;
            }
        }
        i = high;
        if (arcLengths[i] === targetArcLength) {
            return i / (il - 1);
        }
        const lengthBefore = arcLengths[i];
        const lengthAfter = arcLengths[i + 1];
        const segmentLength = lengthAfter - lengthBefore;
        const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
        const t = (i + segmentFraction) / (il - 1);
        return t;
    }
    getTangent(t, optionalTarget) {
        let t1 = t - 0.0001;
        let t2 = t + 0.0001;
        if (t1 < 0) t1 = 0;
        if (t2 > 1) t2 = 1;
        const pt1 = this.getPoint(t1);
        const pt2 = this.getPoint(t2);
        const tangent = optionalTarget || (pt1.isVector2 ? new Vector2() : new Vector3());
        tangent.copy(pt2).sub(pt1).normalize();
        return tangent;
    }
    getTangentAt(u, optionalTarget) {
        const t = this.getUtoTmapping(u);
        return this.getTangent(t, optionalTarget);
    }
    computeFrenetFrames(segments, closed) {
        const normal = new Vector3();
        const tangents = [];
        const normals = [];
        const binormals = [];
        const vec = new Vector3();
        const mat = new Matrix4();
        for(let i = 0; i <= segments; i++){
            const u = i / segments;
            tangents[i] = this.getTangentAt(u, new Vector3());
        }
        normals[0] = new Vector3();
        binormals[0] = new Vector3();
        let min = Number.MAX_VALUE;
        const tx = Math.abs(tangents[0].x);
        const ty = Math.abs(tangents[0].y);
        const tz = Math.abs(tangents[0].z);
        if (tx <= min) {
            min = tx;
            normal.set(1, 0, 0);
        }
        if (ty <= min) {
            min = ty;
            normal.set(0, 1, 0);
        }
        if (tz <= min) {
            normal.set(0, 0, 1);
        }
        vec.crossVectors(tangents[0], normal).normalize();
        normals[0].crossVectors(tangents[0], vec);
        binormals[0].crossVectors(tangents[0], normals[0]);
        for(let i1 = 1; i1 <= segments; i1++){
            normals[i1] = normals[i1 - 1].clone();
            binormals[i1] = binormals[i1 - 1].clone();
            vec.crossVectors(tangents[i1 - 1], tangents[i1]);
            if (vec.length() > Number.EPSILON) {
                vec.normalize();
                const theta = Math.acos(clamp(tangents[i1 - 1].dot(tangents[i1]), -1, 1));
                normals[i1].applyMatrix4(mat.makeRotationAxis(vec, theta));
            }
            binormals[i1].crossVectors(tangents[i1], normals[i1]);
        }
        if (closed === true) {
            let theta1 = Math.acos(clamp(normals[0].dot(normals[segments]), -1, 1));
            theta1 /= segments;
            if (tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0) {
                theta1 = -theta1;
            }
            for(let i2 = 1; i2 <= segments; i2++){
                normals[i2].applyMatrix4(mat.makeRotationAxis(tangents[i2], theta1 * i2));
                binormals[i2].crossVectors(tangents[i2], normals[i2]);
            }
        }
        return {
            tangents: tangents,
            normals: normals,
            binormals: binormals
        };
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.arcLengthDivisions = source.arcLengthDivisions;
        return this;
    }
    toJSON() {
        const data = {
            metadata: {
                version: 4.5,
                type: 'Curve',
                generator: 'Curve.toJSON'
            }
        };
        data.arcLengthDivisions = this.arcLengthDivisions;
        data.type = this.type;
        return data;
    }
    fromJSON(json) {
        this.arcLengthDivisions = json.arcLengthDivisions;
        return this;
    }
}
class EllipseCurve extends Curve {
    constructor(aX = 0, aY = 0, xRadius = 1, yRadius = 1, aStartAngle = 0, aEndAngle = Math.PI * 2, aClockwise = false, aRotation = 0){
        super();
        this.isEllipseCurve = true;
        this.type = 'EllipseCurve';
        this.aX = aX;
        this.aY = aY;
        this.xRadius = xRadius;
        this.yRadius = yRadius;
        this.aStartAngle = aStartAngle;
        this.aEndAngle = aEndAngle;
        this.aClockwise = aClockwise;
        this.aRotation = aRotation;
    }
    getPoint(t, optionalTarget) {
        const point = optionalTarget || new Vector2();
        const twoPi = Math.PI * 2;
        let deltaAngle = this.aEndAngle - this.aStartAngle;
        const samePoints = Math.abs(deltaAngle) < Number.EPSILON;
        while(deltaAngle < 0)deltaAngle += twoPi;
        while(deltaAngle > twoPi)deltaAngle -= twoPi;
        if (deltaAngle < Number.EPSILON) {
            if (samePoints) {
                deltaAngle = 0;
            } else {
                deltaAngle = twoPi;
            }
        }
        if (this.aClockwise === true && !samePoints) {
            if (deltaAngle === twoPi) {
                deltaAngle = -twoPi;
            } else {
                deltaAngle = deltaAngle - twoPi;
            }
        }
        const angle = this.aStartAngle + t * deltaAngle;
        let x = this.aX + this.xRadius * Math.cos(angle);
        let y = this.aY + this.yRadius * Math.sin(angle);
        if (this.aRotation !== 0) {
            const cos = Math.cos(this.aRotation);
            const sin = Math.sin(this.aRotation);
            const tx = x - this.aX;
            const ty = y - this.aY;
            x = tx * cos - ty * sin + this.aX;
            y = tx * sin + ty * cos + this.aY;
        }
        return point.set(x, y);
    }
    copy(source) {
        super.copy(source);
        this.aX = source.aX;
        this.aY = source.aY;
        this.xRadius = source.xRadius;
        this.yRadius = source.yRadius;
        this.aStartAngle = source.aStartAngle;
        this.aEndAngle = source.aEndAngle;
        this.aClockwise = source.aClockwise;
        this.aRotation = source.aRotation;
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.aX = this.aX;
        data.aY = this.aY;
        data.xRadius = this.xRadius;
        data.yRadius = this.yRadius;
        data.aStartAngle = this.aStartAngle;
        data.aEndAngle = this.aEndAngle;
        data.aClockwise = this.aClockwise;
        data.aRotation = this.aRotation;
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.aX = json.aX;
        this.aY = json.aY;
        this.xRadius = json.xRadius;
        this.yRadius = json.yRadius;
        this.aStartAngle = json.aStartAngle;
        this.aEndAngle = json.aEndAngle;
        this.aClockwise = json.aClockwise;
        this.aRotation = json.aRotation;
        return this;
    }
}
class ArcCurve extends EllipseCurve {
    constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise){
        super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
        this.isArcCurve = true;
        this.type = 'ArcCurve';
    }
}
function CubicPoly() {
    let c0 = 0, c1 = 0, c2 = 0, c3 = 0;
    function init(x0, x1, t0, t1) {
        c0 = x0;
        c1 = t0;
        c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;
        c3 = 2 * x0 - 2 * x1 + t0 + t1;
    }
    return {
        initCatmullRom: function(x0, x1, x2, x3, tension) {
            init(x1, x2, tension * (x2 - x0), tension * (x3 - x1));
        },
        initNonuniformCatmullRom: function(x0, x1, x2, x3, dt0, dt1, dt2) {
            let t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
            let t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;
            t1 *= dt1;
            t2 *= dt1;
            init(x1, x2, t1, t2);
        },
        calc: function(t) {
            const t2 = t * t;
            const t3 = t2 * t;
            return c0 + c1 * t + c2 * t2 + c3 * t3;
        }
    };
}
const tmp = new Vector3();
const px = new CubicPoly();
const py = new CubicPoly();
const pz = new CubicPoly();
class CatmullRomCurve3 extends Curve {
    constructor(points = [], closed = false, curveType = 'centripetal', tension = 0.5){
        super();
        this.isCatmullRomCurve3 = true;
        this.type = 'CatmullRomCurve3';
        this.points = points;
        this.closed = closed;
        this.curveType = curveType;
        this.tension = tension;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        const points = this.points;
        const l = points.length;
        const p = (l - (this.closed ? 0 : 1)) * t;
        let intPoint = Math.floor(p);
        let weight = p - intPoint;
        if (this.closed) {
            intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
        } else if (weight === 0 && intPoint === l - 1) {
            intPoint = l - 2;
            weight = 1;
        }
        let p0, p3;
        if (this.closed || intPoint > 0) {
            p0 = points[(intPoint - 1) % l];
        } else {
            tmp.subVectors(points[0], points[1]).add(points[0]);
            p0 = tmp;
        }
        const p1 = points[intPoint % l];
        const p2 = points[(intPoint + 1) % l];
        if (this.closed || intPoint + 2 < l) {
            p3 = points[(intPoint + 2) % l];
        } else {
            tmp.subVectors(points[l - 1], points[l - 2]).add(points[l - 1]);
            p3 = tmp;
        }
        if (this.curveType === 'centripetal' || this.curveType === 'chordal') {
            const pow = this.curveType === 'chordal' ? 0.5 : 0.25;
            let dt0 = Math.pow(p0.distanceToSquared(p1), pow);
            let dt1 = Math.pow(p1.distanceToSquared(p2), pow);
            let dt2 = Math.pow(p2.distanceToSquared(p3), pow);
            if (dt1 < 1e-4) dt1 = 1.0;
            if (dt0 < 1e-4) dt0 = dt1;
            if (dt2 < 1e-4) dt2 = dt1;
            px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
            py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
            pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);
        } else if (this.curveType === 'catmullrom') {
            px.initCatmullRom(p0.x, p1.x, p2.x, p3.x, this.tension);
            py.initCatmullRom(p0.y, p1.y, p2.y, p3.y, this.tension);
            pz.initCatmullRom(p0.z, p1.z, p2.z, p3.z, this.tension);
        }
        point.set(px.calc(weight), py.calc(weight), pz.calc(weight));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.points = [];
        for(let i = 0, l = source.points.length; i < l; i++){
            const point = source.points[i];
            this.points.push(point.clone());
        }
        this.closed = source.closed;
        this.curveType = source.curveType;
        this.tension = source.tension;
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.points = [];
        for(let i = 0, l = this.points.length; i < l; i++){
            const point = this.points[i];
            data.points.push(point.toArray());
        }
        data.closed = this.closed;
        data.curveType = this.curveType;
        data.tension = this.tension;
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.points = [];
        for(let i = 0, l = json.points.length; i < l; i++){
            const point = json.points[i];
            this.points.push(new Vector3().fromArray(point));
        }
        this.closed = json.closed;
        this.curveType = json.curveType;
        this.tension = json.tension;
        return this;
    }
}
function CatmullRom(t, p0, p1, p2, p3) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
}
function QuadraticBezierP0(t, p) {
    const k = 1 - t;
    return k * k * p;
}
function QuadraticBezierP1(t, p) {
    return 2 * (1 - t) * t * p;
}
function QuadraticBezierP2(t, p) {
    return t * t * p;
}
function QuadraticBezier(t, p0, p1, p2) {
    return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
}
function CubicBezierP0(t, p) {
    const k = 1 - t;
    return k * k * k * p;
}
function CubicBezierP1(t, p) {
    const k = 1 - t;
    return 3 * k * k * t * p;
}
function CubicBezierP2(t, p) {
    return 3 * (1 - t) * t * t * p;
}
function CubicBezierP3(t, p) {
    return t * t * t * p;
}
function CubicBezier(t, p0, p1, p2, p3) {
    return CubicBezierP0(t, p0) + CubicBezierP1(t, p1) + CubicBezierP2(t, p2) + CubicBezierP3(t, p3);
}
class CubicBezierCurve extends Curve {
    constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2(), v3 = new Vector2()){
        super();
        this.isCubicBezierCurve = true;
        this.type = 'CubicBezierCurve';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;
        point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        this.v3.copy(source.v3);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        data.v3 = this.v3.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        this.v3.fromArray(json.v3);
        return this;
    }
}
class CubicBezierCurve3 extends Curve {
    constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3(), v3 = new Vector3()){
        super();
        this.isCubicBezierCurve3 = true;
        this.type = 'CubicBezierCurve3';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;
        point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y), CubicBezier(t, v0.z, v1.z, v2.z, v3.z));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        this.v3.copy(source.v3);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        data.v3 = this.v3.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        this.v3.fromArray(json.v3);
        return this;
    }
}
class LineCurve extends Curve {
    constructor(v1 = new Vector2(), v2 = new Vector2()){
        super();
        this.isLineCurve = true;
        this.type = 'LineCurve';
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        if (t === 1) {
            point.copy(this.v2);
        } else {
            point.copy(this.v2).sub(this.v1);
            point.multiplyScalar(t).add(this.v1);
        }
        return point;
    }
    getPointAt(u, optionalTarget) {
        return this.getPoint(u, optionalTarget);
    }
    getTangent(t, optionalTarget = new Vector2()) {
        return optionalTarget.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(u, optionalTarget) {
        return this.getTangent(u, optionalTarget);
    }
    copy(source) {
        super.copy(source);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class LineCurve3 extends Curve {
    constructor(v1 = new Vector3(), v2 = new Vector3()){
        super();
        this.isLineCurve3 = true;
        this.type = 'LineCurve3';
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        if (t === 1) {
            point.copy(this.v2);
        } else {
            point.copy(this.v2).sub(this.v1);
            point.multiplyScalar(t).add(this.v1);
        }
        return point;
    }
    getPointAt(u, optionalTarget) {
        return this.getPoint(u, optionalTarget);
    }
    getTangent(t, optionalTarget = new Vector3()) {
        return optionalTarget.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(u, optionalTarget) {
        return this.getTangent(u, optionalTarget);
    }
    copy(source) {
        super.copy(source);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class QuadraticBezierCurve extends Curve {
    constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2()){
        super();
        this.isQuadraticBezierCurve = true;
        this.type = 'QuadraticBezierCurve';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2;
        point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class QuadraticBezierCurve3 extends Curve {
    constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3()){
        super();
        this.isQuadraticBezierCurve3 = true;
        this.type = 'QuadraticBezierCurve3';
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
    }
    getPoint(t, optionalTarget = new Vector3()) {
        const point = optionalTarget;
        const v0 = this.v0, v1 = this.v1, v2 = this.v2;
        point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y), QuadraticBezier(t, v0.z, v1.z, v2.z));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.v0 = this.v0.toArray();
        data.v1 = this.v1.toArray();
        data.v2 = this.v2.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.v0.fromArray(json.v0);
        this.v1.fromArray(json.v1);
        this.v2.fromArray(json.v2);
        return this;
    }
}
class SplineCurve extends Curve {
    constructor(points = []){
        super();
        this.isSplineCurve = true;
        this.type = 'SplineCurve';
        this.points = points;
    }
    getPoint(t, optionalTarget = new Vector2()) {
        const point = optionalTarget;
        const points = this.points;
        const p = (points.length - 1) * t;
        const intPoint = Math.floor(p);
        const weight = p - intPoint;
        const p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
        const p1 = points[intPoint];
        const p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
        const p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];
        point.set(CatmullRom(weight, p0.x, p1.x, p2.x, p3.x), CatmullRom(weight, p0.y, p1.y, p2.y, p3.y));
        return point;
    }
    copy(source) {
        super.copy(source);
        this.points = [];
        for(let i = 0, l = source.points.length; i < l; i++){
            const point = source.points[i];
            this.points.push(point.clone());
        }
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.points = [];
        for(let i = 0, l = this.points.length; i < l; i++){
            const point = this.points[i];
            data.points.push(point.toArray());
        }
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.points = [];
        for(let i = 0, l = json.points.length; i < l; i++){
            const point = json.points[i];
            this.points.push(new Vector2().fromArray(point));
        }
        return this;
    }
}
var Curves = Object.freeze({
    __proto__: null,
    ArcCurve: ArcCurve,
    CatmullRomCurve3: CatmullRomCurve3,
    CubicBezierCurve: CubicBezierCurve,
    CubicBezierCurve3: CubicBezierCurve3,
    EllipseCurve: EllipseCurve,
    LineCurve: LineCurve,
    LineCurve3: LineCurve3,
    QuadraticBezierCurve: QuadraticBezierCurve,
    QuadraticBezierCurve3: QuadraticBezierCurve3,
    SplineCurve: SplineCurve
});
class CurvePath extends Curve {
    constructor(){
        super();
        this.type = 'CurvePath';
        this.curves = [];
        this.autoClose = false;
    }
    add(curve) {
        this.curves.push(curve);
    }
    closePath() {
        const startPoint = this.curves[0].getPoint(0);
        const endPoint = this.curves[this.curves.length - 1].getPoint(1);
        if (!startPoint.equals(endPoint)) {
            this.curves.push(new LineCurve(endPoint, startPoint));
        }
    }
    getPoint(t, optionalTarget) {
        const d = t * this.getLength();
        const curveLengths = this.getCurveLengths();
        let i = 0;
        while(i < curveLengths.length){
            if (curveLengths[i] >= d) {
                const diff = curveLengths[i] - d;
                const curve = this.curves[i];
                const segmentLength = curve.getLength();
                const u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;
                return curve.getPointAt(u, optionalTarget);
            }
            i++;
        }
        return null;
    }
    getLength() {
        const lens = this.getCurveLengths();
        return lens[lens.length - 1];
    }
    updateArcLengths() {
        this.needsUpdate = true;
        this.cacheLengths = null;
        this.getCurveLengths();
    }
    getCurveLengths() {
        if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {
            return this.cacheLengths;
        }
        const lengths = [];
        let sums = 0;
        for(let i = 0, l = this.curves.length; i < l; i++){
            sums += this.curves[i].getLength();
            lengths.push(sums);
        }
        this.cacheLengths = lengths;
        return lengths;
    }
    getSpacedPoints(divisions = 40) {
        const points = [];
        for(let i = 0; i <= divisions; i++){
            points.push(this.getPoint(i / divisions));
        }
        if (this.autoClose) {
            points.push(points[0]);
        }
        return points;
    }
    getPoints(divisions = 12) {
        const points = [];
        let last;
        for(let i = 0, curves = this.curves; i < curves.length; i++){
            const curve = curves[i];
            const resolution = curve.isEllipseCurve ? divisions * 2 : curve.isLineCurve || curve.isLineCurve3 ? 1 : curve.isSplineCurve ? divisions * curve.points.length : divisions;
            const pts = curve.getPoints(resolution);
            for(let j = 0; j < pts.length; j++){
                const point = pts[j];
                if (last && last.equals(point)) continue;
                points.push(point);
                last = point;
            }
        }
        if (this.autoClose && points.length > 1 && !points[points.length - 1].equals(points[0])) {
            points.push(points[0]);
        }
        return points;
    }
    copy(source) {
        super.copy(source);
        this.curves = [];
        for(let i = 0, l = source.curves.length; i < l; i++){
            const curve = source.curves[i];
            this.curves.push(curve.clone());
        }
        this.autoClose = source.autoClose;
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.autoClose = this.autoClose;
        data.curves = [];
        for(let i = 0, l = this.curves.length; i < l; i++){
            const curve = this.curves[i];
            data.curves.push(curve.toJSON());
        }
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.autoClose = json.autoClose;
        this.curves = [];
        for(let i = 0, l = json.curves.length; i < l; i++){
            const curve = json.curves[i];
            this.curves.push(new Curves[curve.type]().fromJSON(curve));
        }
        return this;
    }
}
class Path extends CurvePath {
    constructor(points){
        super();
        this.type = 'Path';
        this.currentPoint = new Vector2();
        if (points) {
            this.setFromPoints(points);
        }
    }
    setFromPoints(points) {
        this.moveTo(points[0].x, points[0].y);
        for(let i = 1, l = points.length; i < l; i++){
            this.lineTo(points[i].x, points[i].y);
        }
        return this;
    }
    moveTo(x, y) {
        this.currentPoint.set(x, y);
        return this;
    }
    lineTo(x, y) {
        const curve = new LineCurve(this.currentPoint.clone(), new Vector2(x, y));
        this.curves.push(curve);
        this.currentPoint.set(x, y);
        return this;
    }
    quadraticCurveTo(aCPx, aCPy, aX, aY) {
        const curve = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(aCPx, aCPy), new Vector2(aX, aY));
        this.curves.push(curve);
        this.currentPoint.set(aX, aY);
        return this;
    }
    bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
        const curve = new CubicBezierCurve(this.currentPoint.clone(), new Vector2(aCP1x, aCP1y), new Vector2(aCP2x, aCP2y), new Vector2(aX, aY));
        this.curves.push(curve);
        this.currentPoint.set(aX, aY);
        return this;
    }
    splineThru(pts) {
        const npts = [
            this.currentPoint.clone()
        ].concat(pts);
        const curve = new SplineCurve(npts);
        this.curves.push(curve);
        this.currentPoint.copy(pts[pts.length - 1]);
        return this;
    }
    arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
        const x0 = this.currentPoint.x;
        const y0 = this.currentPoint.y;
        this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise);
        return this;
    }
    absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
        this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
        return this;
    }
    ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
        const x0 = this.currentPoint.x;
        const y0 = this.currentPoint.y;
        this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
        return this;
    }
    absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
        const curve = new EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
        if (this.curves.length > 0) {
            const firstPoint = curve.getPoint(0);
            if (!firstPoint.equals(this.currentPoint)) {
                this.lineTo(firstPoint.x, firstPoint.y);
            }
        }
        this.curves.push(curve);
        const lastPoint = curve.getPoint(1);
        this.currentPoint.copy(lastPoint);
        return this;
    }
    copy(source) {
        super.copy(source);
        this.currentPoint.copy(source.currentPoint);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.currentPoint = this.currentPoint.toArray();
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.currentPoint.fromArray(json.currentPoint);
        return this;
    }
}
class LatheGeometry extends BufferGeometry {
    constructor(points = [
        new Vector2(0, -0.5),
        new Vector2(0.5, 0),
        new Vector2(0, 0.5)
    ], segments = 12, phiStart = 0, phiLength = Math.PI * 2){
        super();
        this.type = 'LatheGeometry';
        this.parameters = {
            points: points,
            segments: segments,
            phiStart: phiStart,
            phiLength: phiLength
        };
        segments = Math.floor(segments);
        phiLength = clamp(phiLength, 0, Math.PI * 2);
        const indices = [];
        const vertices = [];
        const uvs = [];
        const initNormals = [];
        const normals = [];
        const inverseSegments = 1.0 / segments;
        const vertex = new Vector3();
        const uv = new Vector2();
        const normal = new Vector3();
        const curNormal = new Vector3();
        const prevNormal = new Vector3();
        let dx = 0;
        let dy = 0;
        for(let j = 0; j <= points.length - 1; j++){
            switch(j){
                case 0:
                    dx = points[j + 1].x - points[j].x;
                    dy = points[j + 1].y - points[j].y;
                    normal.x = dy * 1.0;
                    normal.y = -dx;
                    normal.z = dy * 0.0;
                    prevNormal.copy(normal);
                    normal.normalize();
                    initNormals.push(normal.x, normal.y, normal.z);
                    break;
                case points.length - 1:
                    initNormals.push(prevNormal.x, prevNormal.y, prevNormal.z);
                    break;
                default:
                    dx = points[j + 1].x - points[j].x;
                    dy = points[j + 1].y - points[j].y;
                    normal.x = dy * 1.0;
                    normal.y = -dx;
                    normal.z = dy * 0.0;
                    curNormal.copy(normal);
                    normal.x += prevNormal.x;
                    normal.y += prevNormal.y;
                    normal.z += prevNormal.z;
                    normal.normalize();
                    initNormals.push(normal.x, normal.y, normal.z);
                    prevNormal.copy(curNormal);
            }
        }
        for(let i = 0; i <= segments; i++){
            const phi = phiStart + i * inverseSegments * phiLength;
            const sin = Math.sin(phi);
            const cos = Math.cos(phi);
            for(let j1 = 0; j1 <= points.length - 1; j1++){
                vertex.x = points[j1].x * sin;
                vertex.y = points[j1].y;
                vertex.z = points[j1].x * cos;
                vertices.push(vertex.x, vertex.y, vertex.z);
                uv.x = i / segments;
                uv.y = j1 / (points.length - 1);
                uvs.push(uv.x, uv.y);
                const x = initNormals[3 * j1 + 0] * sin;
                const y = initNormals[3 * j1 + 1];
                const z = initNormals[3 * j1 + 0] * cos;
                normals.push(x, y, z);
            }
        }
        for(let i1 = 0; i1 < segments; i1++){
            for(let j2 = 0; j2 < points.length - 1; j2++){
                const base = j2 + i1 * points.length;
                const a = base;
                const b = base + points.length;
                const c = base + points.length + 1;
                const d = base + 1;
                indices.push(a, b, d);
                indices.push(c, d, b);
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new LatheGeometry(data.points, data.segments, data.phiStart, data.phiLength);
    }
}
class CapsuleGeometry extends LatheGeometry {
    constructor(radius = 1, length = 1, capSegments = 4, radialSegments = 8){
        const path = new Path();
        path.absarc(0, -length / 2, radius, Math.PI * 1.5, 0);
        path.absarc(0, length / 2, radius, 0, Math.PI * 0.5);
        super(path.getPoints(capSegments), radialSegments);
        this.type = 'CapsuleGeometry';
        this.parameters = {
            radius: radius,
            height: length,
            capSegments: capSegments,
            radialSegments: radialSegments
        };
    }
    static fromJSON(data) {
        return new CapsuleGeometry(data.radius, data.length, data.capSegments, data.radialSegments);
    }
}
class CircleGeometry extends BufferGeometry {
    constructor(radius = 1, segments = 32, thetaStart = 0, thetaLength = Math.PI * 2){
        super();
        this.type = 'CircleGeometry';
        this.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        segments = Math.max(3, segments);
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        const vertex = new Vector3();
        const uv = new Vector2();
        vertices.push(0, 0, 0);
        normals.push(0, 0, 1);
        uvs.push(0.5, 0.5);
        for(let s = 0, i = 3; s <= segments; s++, i += 3){
            const segment = thetaStart + s / segments * thetaLength;
            vertex.x = radius * Math.cos(segment);
            vertex.y = radius * Math.sin(segment);
            vertices.push(vertex.x, vertex.y, vertex.z);
            normals.push(0, 0, 1);
            uv.x = (vertices[i] / radius + 1) / 2;
            uv.y = (vertices[i + 1] / radius + 1) / 2;
            uvs.push(uv.x, uv.y);
        }
        for(let i1 = 1; i1 <= segments; i1++){
            indices.push(i1, i1 + 1, 0);
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new CircleGeometry(data.radius, data.segments, data.thetaStart, data.thetaLength);
    }
}
class CylinderGeometry extends BufferGeometry {
    constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 32, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2){
        super();
        this.type = 'CylinderGeometry';
        this.parameters = {
            radiusTop: radiusTop,
            radiusBottom: radiusBottom,
            height: height,
            radialSegments: radialSegments,
            heightSegments: heightSegments,
            openEnded: openEnded,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        const scope = this;
        radialSegments = Math.floor(radialSegments);
        heightSegments = Math.floor(heightSegments);
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        let index = 0;
        const indexArray = [];
        const halfHeight = height / 2;
        let groupStart = 0;
        generateTorso();
        if (openEnded === false) {
            if (radiusTop > 0) generateCap(true);
            if (radiusBottom > 0) generateCap(false);
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        function generateTorso() {
            const normal = new Vector3();
            const vertex = new Vector3();
            let groupCount = 0;
            const slope = (radiusBottom - radiusTop) / height;
            for(let y = 0; y <= heightSegments; y++){
                const indexRow = [];
                const v = y / heightSegments;
                const radius = v * (radiusBottom - radiusTop) + radiusTop;
                for(let x = 0; x <= radialSegments; x++){
                    const u = x / radialSegments;
                    const theta = u * thetaLength + thetaStart;
                    const sinTheta = Math.sin(theta);
                    const cosTheta = Math.cos(theta);
                    vertex.x = radius * sinTheta;
                    vertex.y = -v * height + halfHeight;
                    vertex.z = radius * cosTheta;
                    vertices.push(vertex.x, vertex.y, vertex.z);
                    normal.set(sinTheta, slope, cosTheta).normalize();
                    normals.push(normal.x, normal.y, normal.z);
                    uvs.push(u, 1 - v);
                    indexRow.push(index++);
                }
                indexArray.push(indexRow);
            }
            for(let x1 = 0; x1 < radialSegments; x1++){
                for(let y1 = 0; y1 < heightSegments; y1++){
                    const a = indexArray[y1][x1];
                    const b = indexArray[y1 + 1][x1];
                    const c = indexArray[y1 + 1][x1 + 1];
                    const d = indexArray[y1][x1 + 1];
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                    groupCount += 6;
                }
            }
            scope.addGroup(groupStart, groupCount, 0);
            groupStart += groupCount;
        }
        function generateCap(top) {
            const centerIndexStart = index;
            const uv = new Vector2();
            const vertex = new Vector3();
            let groupCount = 0;
            const radius = top === true ? radiusTop : radiusBottom;
            const sign = top === true ? 1 : -1;
            for(let x = 1; x <= radialSegments; x++){
                vertices.push(0, halfHeight * sign, 0);
                normals.push(0, sign, 0);
                uvs.push(0.5, 0.5);
                index++;
            }
            const centerIndexEnd = index;
            for(let x1 = 0; x1 <= radialSegments; x1++){
                const u = x1 / radialSegments;
                const theta = u * thetaLength + thetaStart;
                const cosTheta = Math.cos(theta);
                const sinTheta = Math.sin(theta);
                vertex.x = radius * sinTheta;
                vertex.y = halfHeight * sign;
                vertex.z = radius * cosTheta;
                vertices.push(vertex.x, vertex.y, vertex.z);
                normals.push(0, sign, 0);
                uv.x = cosTheta * 0.5 + 0.5;
                uv.y = sinTheta * 0.5 * sign + 0.5;
                uvs.push(uv.x, uv.y);
                index++;
            }
            for(let x2 = 0; x2 < radialSegments; x2++){
                const c = centerIndexStart + x2;
                const i = centerIndexEnd + x2;
                if (top === true) {
                    indices.push(i, i + 1, c);
                } else {
                    indices.push(i + 1, i, c);
                }
                groupCount += 3;
            }
            scope.addGroup(groupStart, groupCount, top === true ? 1 : 2);
            groupStart += groupCount;
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new CylinderGeometry(data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
    }
}
class ConeGeometry extends CylinderGeometry {
    constructor(radius = 1, height = 1, radialSegments = 32, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2){
        super(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
        this.type = 'ConeGeometry';
        this.parameters = {
            radius: radius,
            height: height,
            radialSegments: radialSegments,
            heightSegments: heightSegments,
            openEnded: openEnded,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
    }
    static fromJSON(data) {
        return new ConeGeometry(data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
    }
}
class PolyhedronGeometry extends BufferGeometry {
    constructor(vertices = [], indices = [], radius = 1, detail = 0){
        super();
        this.type = 'PolyhedronGeometry';
        this.parameters = {
            vertices: vertices,
            indices: indices,
            radius: radius,
            detail: detail
        };
        const vertexBuffer = [];
        const uvBuffer = [];
        subdivide(detail);
        applyRadius(radius);
        generateUVs();
        this.setAttribute('position', new Float32BufferAttribute(vertexBuffer, 3));
        this.setAttribute('normal', new Float32BufferAttribute(vertexBuffer.slice(), 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvBuffer, 2));
        if (detail === 0) {
            this.computeVertexNormals();
        } else {
            this.normalizeNormals();
        }
        function subdivide(detail) {
            const a = new Vector3();
            const b = new Vector3();
            const c = new Vector3();
            for(let i = 0; i < indices.length; i += 3){
                getVertexByIndex(indices[i + 0], a);
                getVertexByIndex(indices[i + 1], b);
                getVertexByIndex(indices[i + 2], c);
                subdivideFace(a, b, c, detail);
            }
        }
        function subdivideFace(a, b, c, detail) {
            const cols = detail + 1;
            const v = [];
            for(let i = 0; i <= cols; i++){
                v[i] = [];
                const aj = a.clone().lerp(c, i / cols);
                const bj = b.clone().lerp(c, i / cols);
                const rows = cols - i;
                for(let j = 0; j <= rows; j++){
                    if (j === 0 && i === cols) {
                        v[i][j] = aj;
                    } else {
                        v[i][j] = aj.clone().lerp(bj, j / rows);
                    }
                }
            }
            for(let i1 = 0; i1 < cols; i1++){
                for(let j1 = 0; j1 < 2 * (cols - i1) - 1; j1++){
                    const k = Math.floor(j1 / 2);
                    if (j1 % 2 === 0) {
                        pushVertex(v[i1][k + 1]);
                        pushVertex(v[i1 + 1][k]);
                        pushVertex(v[i1][k]);
                    } else {
                        pushVertex(v[i1][k + 1]);
                        pushVertex(v[i1 + 1][k + 1]);
                        pushVertex(v[i1 + 1][k]);
                    }
                }
            }
        }
        function applyRadius(radius) {
            const vertex = new Vector3();
            for(let i = 0; i < vertexBuffer.length; i += 3){
                vertex.x = vertexBuffer[i + 0];
                vertex.y = vertexBuffer[i + 1];
                vertex.z = vertexBuffer[i + 2];
                vertex.normalize().multiplyScalar(radius);
                vertexBuffer[i + 0] = vertex.x;
                vertexBuffer[i + 1] = vertex.y;
                vertexBuffer[i + 2] = vertex.z;
            }
        }
        function generateUVs() {
            const vertex = new Vector3();
            for(let i = 0; i < vertexBuffer.length; i += 3){
                vertex.x = vertexBuffer[i + 0];
                vertex.y = vertexBuffer[i + 1];
                vertex.z = vertexBuffer[i + 2];
                const u = azimuth(vertex) / 2 / Math.PI + 0.5;
                const v = inclination(vertex) / Math.PI + 0.5;
                uvBuffer.push(u, 1 - v);
            }
            correctUVs();
            correctSeam();
        }
        function correctSeam() {
            for(let i = 0; i < uvBuffer.length; i += 6){
                const x0 = uvBuffer[i + 0];
                const x1 = uvBuffer[i + 2];
                const x2 = uvBuffer[i + 4];
                const max = Math.max(x0, x1, x2);
                const min = Math.min(x0, x1, x2);
                if (max > 0.9 && min < 0.1) {
                    if (x0 < 0.2) uvBuffer[i + 0] += 1;
                    if (x1 < 0.2) uvBuffer[i + 2] += 1;
                    if (x2 < 0.2) uvBuffer[i + 4] += 1;
                }
            }
        }
        function pushVertex(vertex) {
            vertexBuffer.push(vertex.x, vertex.y, vertex.z);
        }
        function getVertexByIndex(index, vertex) {
            const stride = index * 3;
            vertex.x = vertices[stride + 0];
            vertex.y = vertices[stride + 1];
            vertex.z = vertices[stride + 2];
        }
        function correctUVs() {
            const a = new Vector3();
            const b = new Vector3();
            const c = new Vector3();
            const centroid = new Vector3();
            const uvA = new Vector2();
            const uvB = new Vector2();
            const uvC = new Vector2();
            for(let i = 0, j = 0; i < vertexBuffer.length; i += 9, j += 6){
                a.set(vertexBuffer[i + 0], vertexBuffer[i + 1], vertexBuffer[i + 2]);
                b.set(vertexBuffer[i + 3], vertexBuffer[i + 4], vertexBuffer[i + 5]);
                c.set(vertexBuffer[i + 6], vertexBuffer[i + 7], vertexBuffer[i + 8]);
                uvA.set(uvBuffer[j + 0], uvBuffer[j + 1]);
                uvB.set(uvBuffer[j + 2], uvBuffer[j + 3]);
                uvC.set(uvBuffer[j + 4], uvBuffer[j + 5]);
                centroid.copy(a).add(b).add(c).divideScalar(3);
                const azi = azimuth(centroid);
                correctUV(uvA, j + 0, a, azi);
                correctUV(uvB, j + 2, b, azi);
                correctUV(uvC, j + 4, c, azi);
            }
        }
        function correctUV(uv, stride, vector, azimuth) {
            if (azimuth < 0 && uv.x === 1) {
                uvBuffer[stride] = uv.x - 1;
            }
            if (vector.x === 0 && vector.z === 0) {
                uvBuffer[stride] = azimuth / 2 / Math.PI + 0.5;
            }
        }
        function azimuth(vector) {
            return Math.atan2(vector.z, -vector.x);
        }
        function inclination(vector) {
            return Math.atan2(-vector.y, Math.sqrt(vector.x * vector.x + vector.z * vector.z));
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new PolyhedronGeometry(data.vertices, data.indices, data.radius, data.details);
    }
}
class DodecahedronGeometry extends PolyhedronGeometry {
    constructor(radius = 1, detail = 0){
        const t = (1 + Math.sqrt(5)) / 2;
        const r = 1 / t;
        const vertices = [
            -1,
            -1,
            -1,
            -1,
            -1,
            1,
            -1,
            1,
            -1,
            -1,
            1,
            1,
            1,
            -1,
            -1,
            1,
            -1,
            1,
            1,
            1,
            -1,
            1,
            1,
            1,
            0,
            -r,
            -t,
            0,
            -r,
            t,
            0,
            r,
            -t,
            0,
            r,
            t,
            -r,
            -t,
            0,
            -r,
            t,
            0,
            r,
            -t,
            0,
            r,
            t,
            0,
            -t,
            0,
            -r,
            t,
            0,
            -r,
            -t,
            0,
            r,
            t,
            0,
            r
        ];
        const indices = [
            3,
            11,
            7,
            3,
            7,
            15,
            3,
            15,
            13,
            7,
            19,
            17,
            7,
            17,
            6,
            7,
            6,
            15,
            17,
            4,
            8,
            17,
            8,
            10,
            17,
            10,
            6,
            8,
            0,
            16,
            8,
            16,
            2,
            8,
            2,
            10,
            0,
            12,
            1,
            0,
            1,
            18,
            0,
            18,
            16,
            6,
            10,
            2,
            6,
            2,
            13,
            6,
            13,
            15,
            2,
            16,
            18,
            2,
            18,
            3,
            2,
            3,
            13,
            18,
            1,
            9,
            18,
            9,
            11,
            18,
            11,
            3,
            4,
            14,
            12,
            4,
            12,
            0,
            4,
            0,
            8,
            11,
            9,
            5,
            11,
            5,
            19,
            11,
            19,
            7,
            19,
            5,
            14,
            19,
            14,
            4,
            19,
            4,
            17,
            1,
            12,
            14,
            1,
            14,
            5,
            1,
            5,
            9
        ];
        super(vertices, indices, radius, detail);
        this.type = 'DodecahedronGeometry';
        this.parameters = {
            radius: radius,
            detail: detail
        };
    }
    static fromJSON(data) {
        return new DodecahedronGeometry(data.radius, data.detail);
    }
}
const _v0 = new Vector3();
const _v1$1 = new Vector3();
const _normal = new Vector3();
const _triangle = new Triangle();
class EdgesGeometry extends BufferGeometry {
    constructor(geometry = null, thresholdAngle = 1){
        super();
        this.type = 'EdgesGeometry';
        this.parameters = {
            geometry: geometry,
            thresholdAngle: thresholdAngle
        };
        if (geometry !== null) {
            const precision = Math.pow(10, 4);
            const thresholdDot = Math.cos(DEG2RAD * thresholdAngle);
            const indexAttr = geometry.getIndex();
            const positionAttr = geometry.getAttribute('position');
            const indexCount = indexAttr ? indexAttr.count : positionAttr.count;
            const indexArr = [
                0,
                0,
                0
            ];
            const vertKeys = [
                'a',
                'b',
                'c'
            ];
            const hashes = new Array(3);
            const edgeData = {};
            const vertices = [];
            for(let i = 0; i < indexCount; i += 3){
                if (indexAttr) {
                    indexArr[0] = indexAttr.getX(i);
                    indexArr[1] = indexAttr.getX(i + 1);
                    indexArr[2] = indexAttr.getX(i + 2);
                } else {
                    indexArr[0] = i;
                    indexArr[1] = i + 1;
                    indexArr[2] = i + 2;
                }
                const { a , b , c  } = _triangle;
                a.fromBufferAttribute(positionAttr, indexArr[0]);
                b.fromBufferAttribute(positionAttr, indexArr[1]);
                c.fromBufferAttribute(positionAttr, indexArr[2]);
                _triangle.getNormal(_normal);
                hashes[0] = `${Math.round(a.x * precision)},${Math.round(a.y * precision)},${Math.round(a.z * precision)}`;
                hashes[1] = `${Math.round(b.x * precision)},${Math.round(b.y * precision)},${Math.round(b.z * precision)}`;
                hashes[2] = `${Math.round(c.x * precision)},${Math.round(c.y * precision)},${Math.round(c.z * precision)}`;
                if (hashes[0] === hashes[1] || hashes[1] === hashes[2] || hashes[2] === hashes[0]) {
                    continue;
                }
                for(let j = 0; j < 3; j++){
                    const jNext = (j + 1) % 3;
                    const vecHash0 = hashes[j];
                    const vecHash1 = hashes[jNext];
                    const v0 = _triangle[vertKeys[j]];
                    const v1 = _triangle[vertKeys[jNext]];
                    const hash = `${vecHash0}_${vecHash1}`;
                    const reverseHash = `${vecHash1}_${vecHash0}`;
                    if (reverseHash in edgeData && edgeData[reverseHash]) {
                        if (_normal.dot(edgeData[reverseHash].normal) <= thresholdDot) {
                            vertices.push(v0.x, v0.y, v0.z);
                            vertices.push(v1.x, v1.y, v1.z);
                        }
                        edgeData[reverseHash] = null;
                    } else if (!(hash in edgeData)) {
                        edgeData[hash] = {
                            index0: indexArr[j],
                            index1: indexArr[jNext],
                            normal: _normal.clone()
                        };
                    }
                }
            }
            for(const key in edgeData){
                if (edgeData[key]) {
                    const { index0 , index1  } = edgeData[key];
                    _v0.fromBufferAttribute(positionAttr, index0);
                    _v1$1.fromBufferAttribute(positionAttr, index1);
                    vertices.push(_v0.x, _v0.y, _v0.z);
                    vertices.push(_v1$1.x, _v1$1.y, _v1$1.z);
                }
            }
            this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
}
class Shape extends Path {
    constructor(points){
        super(points);
        this.uuid = generateUUID();
        this.type = 'Shape';
        this.holes = [];
    }
    getPointsHoles(divisions) {
        const holesPts = [];
        for(let i = 0, l = this.holes.length; i < l; i++){
            holesPts[i] = this.holes[i].getPoints(divisions);
        }
        return holesPts;
    }
    extractPoints(divisions) {
        return {
            shape: this.getPoints(divisions),
            holes: this.getPointsHoles(divisions)
        };
    }
    copy(source) {
        super.copy(source);
        this.holes = [];
        for(let i = 0, l = source.holes.length; i < l; i++){
            const hole = source.holes[i];
            this.holes.push(hole.clone());
        }
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.uuid = this.uuid;
        data.holes = [];
        for(let i = 0, l = this.holes.length; i < l; i++){
            const hole = this.holes[i];
            data.holes.push(hole.toJSON());
        }
        return data;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.uuid = json.uuid;
        this.holes = [];
        for(let i = 0, l = json.holes.length; i < l; i++){
            const hole = json.holes[i];
            this.holes.push(new Path().fromJSON(hole));
        }
        return this;
    }
}
const Earcut = {
    triangulate: function(data, holeIndices, dim = 2) {
        const hasHoles = holeIndices && holeIndices.length;
        const outerLen = hasHoles ? holeIndices[0] * dim : data.length;
        let outerNode = linkedList(data, 0, outerLen, dim, true);
        const triangles = [];
        if (!outerNode || outerNode.next === outerNode.prev) return triangles;
        let minX, minY, maxX, maxY, x, y, invSize;
        if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
        if (data.length > 80 * dim) {
            minX = maxX = data[0];
            minY = maxY = data[1];
            for(let i = dim; i < outerLen; i += dim){
                x = data[i];
                y = data[i + 1];
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
            invSize = Math.max(maxX - minX, maxY - minY);
            invSize = invSize !== 0 ? 32767 / invSize : 0;
        }
        earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
        return triangles;
    }
};
function linkedList(data, start, end, dim, clockwise) {
    let i, last;
    if (clockwise === signedArea(data, start, end, dim) > 0) {
        for(i = start; i < end; i += dim)last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for(i = end - dim; i >= start; i -= dim)last = insertNode(i, data[i], data[i + 1], last);
    }
    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }
    return last;
}
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;
    let p = start, again;
    do {
        again = false;
        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;
        } else {
            p = p.next;
        }
    }while (again || p !== end)
    return end;
}
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
    let stop = ear, prev, next;
    while(ear.prev !== ear.next){
        prev = ear.prev;
        next = ear.next;
        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            triangles.push(prev.i / dim | 0);
            triangles.push(ear.i / dim | 0);
            triangles.push(next.i / dim | 0);
            removeNode(ear);
            ear = next.next;
            stop = next.next;
            continue;
        }
        ear = next;
        if (ear === stop) {
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
            } else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }
            break;
        }
    }
}
function isEar(ear) {
    const a = ear.prev, b = ear, c = ear.next;
    if (area(a, b, c) >= 0) return false;
    const ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
    const x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    let p = c.next;
    while(p !== a){
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }
    return true;
}
function isEarHashed(ear, minX, minY, invSize) {
    const a = ear.prev, b = ear, c = ear.next;
    if (area(a, b, c) >= 0) return false;
    const ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
    const x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    const minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
    let p = ear.prevZ, n = ear.nextZ;
    while(p && p.z >= minZ && n && n.z <= maxZ){
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }
    while(p && p.z >= minZ){
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }
    while(n && n.z <= maxZ){
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }
    return true;
}
function cureLocalIntersections(start, triangles, dim) {
    let p = start;
    do {
        const a = p.prev, b = p.next.next;
        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
            triangles.push(a.i / dim | 0);
            triangles.push(p.i / dim | 0);
            triangles.push(b.i / dim | 0);
            removeNode(p);
            removeNode(p.next);
            p = start = b;
        }
        p = p.next;
    }while (p !== start)
    return filterPoints(p);
}
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    let a = start;
    do {
        let b = a.next.next;
        while(b !== a.prev){
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                let c = splitPolygon(a, b);
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);
                earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
                earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
                return;
            }
            b = b.next;
        }
        a = a.next;
    }while (a !== start)
}
function eliminateHoles(data, holeIndices, outerNode, dim) {
    const queue = [];
    let i, len, start, end, list;
    for(i = 0, len = holeIndices.length; i < len; i++){
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }
    queue.sort(compareX);
    for(i = 0; i < queue.length; i++){
        outerNode = eliminateHole(queue[i], outerNode);
    }
    return outerNode;
}
function compareX(a, b) {
    return a.x - b.x;
}
function eliminateHole(hole, outerNode) {
    const bridge = findHoleBridge(hole, outerNode);
    if (!bridge) {
        return outerNode;
    }
    const bridgeReverse = splitPolygon(bridge, hole);
    filterPoints(bridgeReverse, bridgeReverse.next);
    return filterPoints(bridge, bridge.next);
}
function findHoleBridge(hole, outerNode) {
    let p = outerNode, qx = -Infinity, m;
    const hx = hole.x, hy = hole.y;
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            const x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                m = p.x < p.next.x ? p : p.next;
                if (x === hx) return m;
            }
        }
        p = p.next;
    }while (p !== outerNode)
    if (!m) return null;
    const stop = m, mx = m.x, my = m.y;
    let tanMin = Infinity, tan;
    p = m;
    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
            tan = Math.abs(hy - p.y) / (hx - p.x);
            if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
                m = p;
                tanMin = tan;
            }
        }
        p = p.next;
    }while (p !== stop)
    return m;
}
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}
function indexCurve(start, minX, minY, invSize) {
    let p = start;
    do {
        if (p.z === 0) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    }while (p !== start)
    p.prevZ.nextZ = null;
    p.prevZ = null;
    sortLinked(p);
}
function sortLinked(list) {
    let i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;
        while(p){
            numMerges++;
            q = p;
            pSize = 0;
            for(i = 0; i < inSize; i++){
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;
            while(pSize > 0 || qSize > 0 && q){
                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }
                if (tail) tail.nextZ = e;
                else list = e;
                e.prevZ = tail;
                tail = e;
            }
            p = q;
        }
        tail.nextZ = null;
        inSize *= 2;
    }while (numMerges > 1)
    return list;
}
function zOrder(x, y, minX, minY, invSize) {
    x = (x - minX) * invSize | 0;
    y = (y - minY) * invSize | 0;
    x = (x | x << 8) & 0x00FF00FF;
    x = (x | x << 4) & 0x0F0F0F0F;
    x = (x | x << 2) & 0x33333333;
    x = (x | x << 1) & 0x55555555;
    y = (y | y << 8) & 0x00FF00FF;
    y = (y | y << 4) & 0x0F0F0F0F;
    y = (y | y << 2) & 0x33333333;
    y = (y | y << 1) & 0x55555555;
    return x | y << 1;
}
function getLeftmost(start) {
    let p = start, leftmost = start;
    do {
        if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y) leftmost = p;
        p = p.next;
    }while (p !== start)
    return leftmost;
}
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
}
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && (area(a.prev, a, b.prev) || area(a, b.prev, b)) || equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
}
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
function intersects(p1, q1, p2, q2) {
    const o1 = sign(area(p1, q1, p2));
    const o2 = sign(area(p1, q1, q2));
    const o3 = sign(area(p2, q2, p1));
    const o4 = sign(area(p2, q2, q1));
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(p1, p2, q1)) return true;
    if (o2 === 0 && onSegment(p1, q2, q1)) return true;
    if (o3 === 0 && onSegment(p2, p1, q2)) return true;
    if (o4 === 0 && onSegment(p2, q1, q2)) return true;
    return false;
}
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}
function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}
function intersectsPolygon(a, b) {
    let p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
        p = p.next;
    }while (p !== a)
    return false;
}
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}
function middleInside(a, b) {
    let p = a, inside = false;
    const px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
    do {
        if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
        p = p.next;
    }while (p !== a)
    return inside;
}
function splitPolygon(a, b) {
    const a2 = new Node(a.i, a.x, a.y), b2 = new Node(b.i, b.x, b.y), an = a.next, bp = b.prev;
    a.next = b;
    b.prev = a;
    a2.next = an;
    an.prev = a2;
    b2.next = a2;
    a2.prev = b2;
    bp.next = b2;
    b2.prev = bp;
    return b2;
}
function insertNode(i, x, y, last) {
    const p = new Node(i, x, y);
    if (!last) {
        p.prev = p;
        p.next = p;
    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}
function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;
    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}
function Node(i, x, y) {
    this.i = i;
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
    this.z = 0;
    this.prevZ = null;
    this.nextZ = null;
    this.steiner = false;
}
function signedArea(data, start, end, dim) {
    let sum = 0;
    for(let i = start, j = end - dim; i < end; i += dim){
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}
class ShapeUtils {
    static area(contour) {
        const n = contour.length;
        let a = 0.0;
        for(let p = n - 1, q = 0; q < n; p = q++){
            a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
        }
        return a * 0.5;
    }
    static isClockWise(pts) {
        return ShapeUtils.area(pts) < 0;
    }
    static triangulateShape(contour, holes) {
        const vertices = [];
        const holeIndices = [];
        const faces = [];
        removeDupEndPts(contour);
        addContour(vertices, contour);
        let holeIndex = contour.length;
        holes.forEach(removeDupEndPts);
        for(let i = 0; i < holes.length; i++){
            holeIndices.push(holeIndex);
            holeIndex += holes[i].length;
            addContour(vertices, holes[i]);
        }
        const triangles = Earcut.triangulate(vertices, holeIndices);
        for(let i1 = 0; i1 < triangles.length; i1 += 3){
            faces.push(triangles.slice(i1, i1 + 3));
        }
        return faces;
    }
}
function removeDupEndPts(points) {
    const l = points.length;
    if (l > 2 && points[l - 1].equals(points[0])) {
        points.pop();
    }
}
function addContour(vertices, contour) {
    for(let i = 0; i < contour.length; i++){
        vertices.push(contour[i].x);
        vertices.push(contour[i].y);
    }
}
class ExtrudeGeometry extends BufferGeometry {
    constructor(shapes = new Shape([
        new Vector2(0.5, 0.5),
        new Vector2(-0.5, 0.5),
        new Vector2(-0.5, -0.5),
        new Vector2(0.5, -0.5)
    ]), options = {}){
        super();
        this.type = 'ExtrudeGeometry';
        this.parameters = {
            shapes: shapes,
            options: options
        };
        shapes = Array.isArray(shapes) ? shapes : [
            shapes
        ];
        const scope = this;
        const verticesArray = [];
        const uvArray = [];
        for(let i = 0, l = shapes.length; i < l; i++){
            const shape = shapes[i];
            addShape(shape);
        }
        this.setAttribute('position', new Float32BufferAttribute(verticesArray, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvArray, 2));
        this.computeVertexNormals();
        function addShape(shape) {
            const placeholder = [];
            const curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;
            const steps = options.steps !== undefined ? options.steps : 1;
            const depth = options.depth !== undefined ? options.depth : 1;
            let bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true;
            let bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 0.2;
            let bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness - 0.1;
            let bevelOffset = options.bevelOffset !== undefined ? options.bevelOffset : 0;
            let bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;
            const extrudePath = options.extrudePath;
            const uvgen = options.UVGenerator !== undefined ? options.UVGenerator : WorldUVGenerator;
            let extrudePts, extrudeByPath = false;
            let splineTube, binormal, normal, position2;
            if (extrudePath) {
                extrudePts = extrudePath.getSpacedPoints(steps);
                extrudeByPath = true;
                bevelEnabled = false;
                splineTube = extrudePath.computeFrenetFrames(steps, false);
                binormal = new Vector3();
                normal = new Vector3();
                position2 = new Vector3();
            }
            if (!bevelEnabled) {
                bevelSegments = 0;
                bevelThickness = 0;
                bevelSize = 0;
                bevelOffset = 0;
            }
            const shapePoints = shape.extractPoints(curveSegments);
            let vertices = shapePoints.shape;
            const holes = shapePoints.holes;
            const reverse = !ShapeUtils.isClockWise(vertices);
            if (reverse) {
                vertices = vertices.reverse();
                for(let h = 0, hl = holes.length; h < hl; h++){
                    const ahole = holes[h];
                    if (ShapeUtils.isClockWise(ahole)) {
                        holes[h] = ahole.reverse();
                    }
                }
            }
            const faces = ShapeUtils.triangulateShape(vertices, holes);
            const contour = vertices;
            for(let h1 = 0, hl1 = holes.length; h1 < hl1; h1++){
                const ahole1 = holes[h1];
                vertices = vertices.concat(ahole1);
            }
            function scalePt2(pt, vec, size) {
                if (!vec) console.error('THREE.ExtrudeGeometry: vec does not exist');
                return pt.clone().addScaledVector(vec, size);
            }
            const vlen = vertices.length, flen = faces.length;
            function getBevelVec(inPt, inPrev, inNext) {
                let v_trans_x, v_trans_y, shrink_by;
                const v_prev_x = inPt.x - inPrev.x, v_prev_y = inPt.y - inPrev.y;
                const v_next_x = inNext.x - inPt.x, v_next_y = inNext.y - inPt.y;
                const v_prev_lensq = v_prev_x * v_prev_x + v_prev_y * v_prev_y;
                const collinear0 = v_prev_x * v_next_y - v_prev_y * v_next_x;
                if (Math.abs(collinear0) > Number.EPSILON) {
                    const v_prev_len = Math.sqrt(v_prev_lensq);
                    const v_next_len = Math.sqrt(v_next_x * v_next_x + v_next_y * v_next_y);
                    const ptPrevShift_x = inPrev.x - v_prev_y / v_prev_len;
                    const ptPrevShift_y = inPrev.y + v_prev_x / v_prev_len;
                    const ptNextShift_x = inNext.x - v_next_y / v_next_len;
                    const ptNextShift_y = inNext.y + v_next_x / v_next_len;
                    const sf = ((ptNextShift_x - ptPrevShift_x) * v_next_y - (ptNextShift_y - ptPrevShift_y) * v_next_x) / (v_prev_x * v_next_y - v_prev_y * v_next_x);
                    v_trans_x = ptPrevShift_x + v_prev_x * sf - inPt.x;
                    v_trans_y = ptPrevShift_y + v_prev_y * sf - inPt.y;
                    const v_trans_lensq = v_trans_x * v_trans_x + v_trans_y * v_trans_y;
                    if (v_trans_lensq <= 2) {
                        return new Vector2(v_trans_x, v_trans_y);
                    } else {
                        shrink_by = Math.sqrt(v_trans_lensq / 2);
                    }
                } else {
                    let direction_eq = false;
                    if (v_prev_x > Number.EPSILON) {
                        if (v_next_x > Number.EPSILON) {
                            direction_eq = true;
                        }
                    } else {
                        if (v_prev_x < -Number.EPSILON) {
                            if (v_next_x < -Number.EPSILON) {
                                direction_eq = true;
                            }
                        } else {
                            if (Math.sign(v_prev_y) === Math.sign(v_next_y)) {
                                direction_eq = true;
                            }
                        }
                    }
                    if (direction_eq) {
                        v_trans_x = -v_prev_y;
                        v_trans_y = v_prev_x;
                        shrink_by = Math.sqrt(v_prev_lensq);
                    } else {
                        v_trans_x = v_prev_x;
                        v_trans_y = v_prev_y;
                        shrink_by = Math.sqrt(v_prev_lensq / 2);
                    }
                }
                return new Vector2(v_trans_x / shrink_by, v_trans_y / shrink_by);
            }
            const contourMovements = [];
            for(let i = 0, il = contour.length, j = il - 1, k = i + 1; i < il; i++, j++, k++){
                if (j === il) j = 0;
                if (k === il) k = 0;
                contourMovements[i] = getBevelVec(contour[i], contour[j], contour[k]);
            }
            const holesMovements = [];
            let oneHoleMovements, verticesMovements = contourMovements.concat();
            for(let h2 = 0, hl2 = holes.length; h2 < hl2; h2++){
                const ahole2 = holes[h2];
                oneHoleMovements = [];
                for(let i1 = 0, il1 = ahole2.length, j1 = il1 - 1, k1 = i1 + 1; i1 < il1; i1++, j1++, k1++){
                    if (j1 === il1) j1 = 0;
                    if (k1 === il1) k1 = 0;
                    oneHoleMovements[i1] = getBevelVec(ahole2[i1], ahole2[j1], ahole2[k1]);
                }
                holesMovements.push(oneHoleMovements);
                verticesMovements = verticesMovements.concat(oneHoleMovements);
            }
            for(let b = 0; b < bevelSegments; b++){
                const t = b / bevelSegments;
                const z = bevelThickness * Math.cos(t * Math.PI / 2);
                const bs = bevelSize * Math.sin(t * Math.PI / 2) + bevelOffset;
                for(let i2 = 0, il2 = contour.length; i2 < il2; i2++){
                    const vert = scalePt2(contour[i2], contourMovements[i2], bs);
                    v(vert.x, vert.y, -z);
                }
                for(let h3 = 0, hl3 = holes.length; h3 < hl3; h3++){
                    const ahole3 = holes[h3];
                    oneHoleMovements = holesMovements[h3];
                    for(let i3 = 0, il3 = ahole3.length; i3 < il3; i3++){
                        const vert1 = scalePt2(ahole3[i3], oneHoleMovements[i3], bs);
                        v(vert1.x, vert1.y, -z);
                    }
                }
            }
            const bs1 = bevelSize + bevelOffset;
            for(let i4 = 0; i4 < vlen; i4++){
                const vert2 = bevelEnabled ? scalePt2(vertices[i4], verticesMovements[i4], bs1) : vertices[i4];
                if (!extrudeByPath) {
                    v(vert2.x, vert2.y, 0);
                } else {
                    normal.copy(splineTube.normals[0]).multiplyScalar(vert2.x);
                    binormal.copy(splineTube.binormals[0]).multiplyScalar(vert2.y);
                    position2.copy(extrudePts[0]).add(normal).add(binormal);
                    v(position2.x, position2.y, position2.z);
                }
            }
            for(let s = 1; s <= steps; s++){
                for(let i5 = 0; i5 < vlen; i5++){
                    const vert3 = bevelEnabled ? scalePt2(vertices[i5], verticesMovements[i5], bs1) : vertices[i5];
                    if (!extrudeByPath) {
                        v(vert3.x, vert3.y, depth / steps * s);
                    } else {
                        normal.copy(splineTube.normals[s]).multiplyScalar(vert3.x);
                        binormal.copy(splineTube.binormals[s]).multiplyScalar(vert3.y);
                        position2.copy(extrudePts[s]).add(normal).add(binormal);
                        v(position2.x, position2.y, position2.z);
                    }
                }
            }
            for(let b1 = bevelSegments - 1; b1 >= 0; b1--){
                const t1 = b1 / bevelSegments;
                const z1 = bevelThickness * Math.cos(t1 * Math.PI / 2);
                const bs2 = bevelSize * Math.sin(t1 * Math.PI / 2) + bevelOffset;
                for(let i6 = 0, il4 = contour.length; i6 < il4; i6++){
                    const vert4 = scalePt2(contour[i6], contourMovements[i6], bs2);
                    v(vert4.x, vert4.y, depth + z1);
                }
                for(let h4 = 0, hl4 = holes.length; h4 < hl4; h4++){
                    const ahole4 = holes[h4];
                    oneHoleMovements = holesMovements[h4];
                    for(let i7 = 0, il5 = ahole4.length; i7 < il5; i7++){
                        const vert5 = scalePt2(ahole4[i7], oneHoleMovements[i7], bs2);
                        if (!extrudeByPath) {
                            v(vert5.x, vert5.y, depth + z1);
                        } else {
                            v(vert5.x, vert5.y + extrudePts[steps - 1].y, extrudePts[steps - 1].x + z1);
                        }
                    }
                }
            }
            buildLidFaces();
            buildSideFaces();
            function buildLidFaces() {
                const start = verticesArray.length / 3;
                if (bevelEnabled) {
                    let layer = 0;
                    let offset = vlen * layer;
                    for(let i = 0; i < flen; i++){
                        const face = faces[i];
                        f3(face[2] + offset, face[1] + offset, face[0] + offset);
                    }
                    layer = steps + bevelSegments * 2;
                    offset = vlen * layer;
                    for(let i1 = 0; i1 < flen; i1++){
                        const face1 = faces[i1];
                        f3(face1[0] + offset, face1[1] + offset, face1[2] + offset);
                    }
                } else {
                    for(let i2 = 0; i2 < flen; i2++){
                        const face2 = faces[i2];
                        f3(face2[2], face2[1], face2[0]);
                    }
                    for(let i3 = 0; i3 < flen; i3++){
                        const face3 = faces[i3];
                        f3(face3[0] + vlen * steps, face3[1] + vlen * steps, face3[2] + vlen * steps);
                    }
                }
                scope.addGroup(start, verticesArray.length / 3 - start, 0);
            }
            function buildSideFaces() {
                const start = verticesArray.length / 3;
                let layeroffset = 0;
                sidewalls(contour, layeroffset);
                layeroffset += contour.length;
                for(let h = 0, hl = holes.length; h < hl; h++){
                    const ahole = holes[h];
                    sidewalls(ahole, layeroffset);
                    layeroffset += ahole.length;
                }
                scope.addGroup(start, verticesArray.length / 3 - start, 1);
            }
            function sidewalls(contour, layeroffset) {
                let i = contour.length;
                while(--i >= 0){
                    const j = i;
                    let k = i - 1;
                    if (k < 0) k = contour.length - 1;
                    for(let s = 0, sl = steps + bevelSegments * 2; s < sl; s++){
                        const slen1 = vlen * s;
                        const slen2 = vlen * (s + 1);
                        const a = layeroffset + j + slen1, b = layeroffset + k + slen1, c = layeroffset + k + slen2, d = layeroffset + j + slen2;
                        f4(a, b, c, d);
                    }
                }
            }
            function v(x, y, z) {
                placeholder.push(x);
                placeholder.push(y);
                placeholder.push(z);
            }
            function f3(a, b, c) {
                addVertex(a);
                addVertex(b);
                addVertex(c);
                const nextIndex = verticesArray.length / 3;
                const uvs = uvgen.generateTopUV(scope, verticesArray, nextIndex - 3, nextIndex - 2, nextIndex - 1);
                addUV(uvs[0]);
                addUV(uvs[1]);
                addUV(uvs[2]);
            }
            function f4(a, b, c, d) {
                addVertex(a);
                addVertex(b);
                addVertex(d);
                addVertex(b);
                addVertex(c);
                addVertex(d);
                const nextIndex = verticesArray.length / 3;
                const uvs = uvgen.generateSideWallUV(scope, verticesArray, nextIndex - 6, nextIndex - 3, nextIndex - 2, nextIndex - 1);
                addUV(uvs[0]);
                addUV(uvs[1]);
                addUV(uvs[3]);
                addUV(uvs[1]);
                addUV(uvs[2]);
                addUV(uvs[3]);
            }
            function addVertex(index) {
                verticesArray.push(placeholder[index * 3 + 0]);
                verticesArray.push(placeholder[index * 3 + 1]);
                verticesArray.push(placeholder[index * 3 + 2]);
            }
            function addUV(vector2) {
                uvArray.push(vector2.x);
                uvArray.push(vector2.y);
            }
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        const shapes = this.parameters.shapes;
        const options = this.parameters.options;
        return toJSON$1(shapes, options, data);
    }
    static fromJSON(data, shapes) {
        const geometryShapes = [];
        for(let j = 0, jl = data.shapes.length; j < jl; j++){
            const shape = shapes[data.shapes[j]];
            geometryShapes.push(shape);
        }
        const extrudePath = data.options.extrudePath;
        if (extrudePath !== undefined) {
            data.options.extrudePath = new Curves[extrudePath.type]().fromJSON(extrudePath);
        }
        return new ExtrudeGeometry(geometryShapes, data.options);
    }
}
const WorldUVGenerator = {
    generateTopUV: function(geometry, vertices, indexA, indexB, indexC) {
        const a_x = vertices[indexA * 3];
        const a_y = vertices[indexA * 3 + 1];
        const b_x = vertices[indexB * 3];
        const b_y = vertices[indexB * 3 + 1];
        const c_x = vertices[indexC * 3];
        const c_y = vertices[indexC * 3 + 1];
        return [
            new Vector2(a_x, a_y),
            new Vector2(b_x, b_y),
            new Vector2(c_x, c_y)
        ];
    },
    generateSideWallUV: function(geometry, vertices, indexA, indexB, indexC, indexD) {
        const a_x = vertices[indexA * 3];
        const a_y = vertices[indexA * 3 + 1];
        const a_z = vertices[indexA * 3 + 2];
        const b_x = vertices[indexB * 3];
        const b_y = vertices[indexB * 3 + 1];
        const b_z = vertices[indexB * 3 + 2];
        const c_x = vertices[indexC * 3];
        const c_y = vertices[indexC * 3 + 1];
        const c_z = vertices[indexC * 3 + 2];
        const d_x = vertices[indexD * 3];
        const d_y = vertices[indexD * 3 + 1];
        const d_z = vertices[indexD * 3 + 2];
        if (Math.abs(a_y - b_y) < Math.abs(a_x - b_x)) {
            return [
                new Vector2(a_x, 1 - a_z),
                new Vector2(b_x, 1 - b_z),
                new Vector2(c_x, 1 - c_z),
                new Vector2(d_x, 1 - d_z)
            ];
        } else {
            return [
                new Vector2(a_y, 1 - a_z),
                new Vector2(b_y, 1 - b_z),
                new Vector2(c_y, 1 - c_z),
                new Vector2(d_y, 1 - d_z)
            ];
        }
    }
};
function toJSON$1(shapes, options, data) {
    data.shapes = [];
    if (Array.isArray(shapes)) {
        for(let i = 0, l = shapes.length; i < l; i++){
            const shape = shapes[i];
            data.shapes.push(shape.uuid);
        }
    } else {
        data.shapes.push(shapes.uuid);
    }
    data.options = Object.assign({}, options);
    if (options.extrudePath !== undefined) data.options.extrudePath = options.extrudePath.toJSON();
    return data;
}
class IcosahedronGeometry extends PolyhedronGeometry {
    constructor(radius = 1, detail = 0){
        const t = (1 + Math.sqrt(5)) / 2;
        const vertices = [
            -1,
            t,
            0,
            1,
            t,
            0,
            -1,
            -t,
            0,
            1,
            -t,
            0,
            0,
            -1,
            t,
            0,
            1,
            t,
            0,
            -1,
            -t,
            0,
            1,
            -t,
            t,
            0,
            -1,
            t,
            0,
            1,
            -t,
            0,
            -1,
            -t,
            0,
            1
        ];
        const indices = [
            0,
            11,
            5,
            0,
            5,
            1,
            0,
            1,
            7,
            0,
            7,
            10,
            0,
            10,
            11,
            1,
            5,
            9,
            5,
            11,
            4,
            11,
            10,
            2,
            10,
            7,
            6,
            7,
            1,
            8,
            3,
            9,
            4,
            3,
            4,
            2,
            3,
            2,
            6,
            3,
            6,
            8,
            3,
            8,
            9,
            4,
            9,
            5,
            2,
            4,
            11,
            6,
            2,
            10,
            8,
            6,
            7,
            9,
            8,
            1
        ];
        super(vertices, indices, radius, detail);
        this.type = 'IcosahedronGeometry';
        this.parameters = {
            radius: radius,
            detail: detail
        };
    }
    static fromJSON(data) {
        return new IcosahedronGeometry(data.radius, data.detail);
    }
}
class OctahedronGeometry extends PolyhedronGeometry {
    constructor(radius = 1, detail = 0){
        const vertices = [
            1,
            0,
            0,
            -1,
            0,
            0,
            0,
            1,
            0,
            0,
            -1,
            0,
            0,
            0,
            1,
            0,
            0,
            -1
        ];
        const indices = [
            0,
            2,
            4,
            0,
            4,
            3,
            0,
            3,
            5,
            0,
            5,
            2,
            1,
            2,
            5,
            1,
            5,
            3,
            1,
            3,
            4,
            1,
            4,
            2
        ];
        super(vertices, indices, radius, detail);
        this.type = 'OctahedronGeometry';
        this.parameters = {
            radius: radius,
            detail: detail
        };
    }
    static fromJSON(data) {
        return new OctahedronGeometry(data.radius, data.detail);
    }
}
class RingGeometry extends BufferGeometry {
    constructor(innerRadius = 0.5, outerRadius = 1, thetaSegments = 32, phiSegments = 1, thetaStart = 0, thetaLength = Math.PI * 2){
        super();
        this.type = 'RingGeometry';
        this.parameters = {
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            thetaSegments: thetaSegments,
            phiSegments: phiSegments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        thetaSegments = Math.max(3, thetaSegments);
        phiSegments = Math.max(1, phiSegments);
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        let radius = innerRadius;
        const radiusStep = (outerRadius - innerRadius) / phiSegments;
        const vertex = new Vector3();
        const uv = new Vector2();
        for(let j = 0; j <= phiSegments; j++){
            for(let i = 0; i <= thetaSegments; i++){
                const segment = thetaStart + i / thetaSegments * thetaLength;
                vertex.x = radius * Math.cos(segment);
                vertex.y = radius * Math.sin(segment);
                vertices.push(vertex.x, vertex.y, vertex.z);
                normals.push(0, 0, 1);
                uv.x = (vertex.x / outerRadius + 1) / 2;
                uv.y = (vertex.y / outerRadius + 1) / 2;
                uvs.push(uv.x, uv.y);
            }
            radius += radiusStep;
        }
        for(let j1 = 0; j1 < phiSegments; j1++){
            const thetaSegmentLevel = j1 * (thetaSegments + 1);
            for(let i1 = 0; i1 < thetaSegments; i1++){
                const segment1 = i1 + thetaSegmentLevel;
                const a = segment1;
                const b = segment1 + thetaSegments + 1;
                const c = segment1 + thetaSegments + 2;
                const d = segment1 + 1;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new RingGeometry(data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength);
    }
}
class ShapeGeometry extends BufferGeometry {
    constructor(shapes = new Shape([
        new Vector2(0, 0.5),
        new Vector2(-0.5, -0.5),
        new Vector2(0.5, -0.5)
    ]), curveSegments = 12){
        super();
        this.type = 'ShapeGeometry';
        this.parameters = {
            shapes: shapes,
            curveSegments: curveSegments
        };
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        let groupStart = 0;
        let groupCount = 0;
        if (Array.isArray(shapes) === false) {
            addShape(shapes);
        } else {
            for(let i = 0; i < shapes.length; i++){
                addShape(shapes[i]);
                this.addGroup(groupStart, groupCount, i);
                groupStart += groupCount;
                groupCount = 0;
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        function addShape(shape) {
            const indexOffset = vertices.length / 3;
            const points = shape.extractPoints(curveSegments);
            let shapeVertices = points.shape;
            const shapeHoles = points.holes;
            if (ShapeUtils.isClockWise(shapeVertices) === false) {
                shapeVertices = shapeVertices.reverse();
            }
            for(let i = 0, l = shapeHoles.length; i < l; i++){
                const shapeHole = shapeHoles[i];
                if (ShapeUtils.isClockWise(shapeHole) === true) {
                    shapeHoles[i] = shapeHole.reverse();
                }
            }
            const faces = ShapeUtils.triangulateShape(shapeVertices, shapeHoles);
            for(let i1 = 0, l1 = shapeHoles.length; i1 < l1; i1++){
                const shapeHole1 = shapeHoles[i1];
                shapeVertices = shapeVertices.concat(shapeHole1);
            }
            for(let i2 = 0, l2 = shapeVertices.length; i2 < l2; i2++){
                const vertex = shapeVertices[i2];
                vertices.push(vertex.x, vertex.y, 0);
                normals.push(0, 0, 1);
                uvs.push(vertex.x, vertex.y);
            }
            for(let i3 = 0, l3 = faces.length; i3 < l3; i3++){
                const face = faces[i3];
                const a = face[0] + indexOffset;
                const b = face[1] + indexOffset;
                const c = face[2] + indexOffset;
                indices.push(a, b, c);
                groupCount += 3;
            }
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        const shapes = this.parameters.shapes;
        return toJSON(shapes, data);
    }
    static fromJSON(data, shapes) {
        const geometryShapes = [];
        for(let j = 0, jl = data.shapes.length; j < jl; j++){
            const shape = shapes[data.shapes[j]];
            geometryShapes.push(shape);
        }
        return new ShapeGeometry(geometryShapes, data.curveSegments);
    }
}
function toJSON(shapes, data) {
    data.shapes = [];
    if (Array.isArray(shapes)) {
        for(let i = 0, l = shapes.length; i < l; i++){
            const shape = shapes[i];
            data.shapes.push(shape.uuid);
        }
    } else {
        data.shapes.push(shapes.uuid);
    }
    return data;
}
class SphereGeometry extends BufferGeometry {
    constructor(radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI){
        super();
        this.type = 'SphereGeometry';
        this.parameters = {
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            phiStart: phiStart,
            phiLength: phiLength,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        widthSegments = Math.max(3, Math.floor(widthSegments));
        heightSegments = Math.max(2, Math.floor(heightSegments));
        const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);
        let index = 0;
        const grid = [];
        const vertex = new Vector3();
        const normal = new Vector3();
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        for(let iy = 0; iy <= heightSegments; iy++){
            const verticesRow = [];
            const v = iy / heightSegments;
            let uOffset = 0;
            if (iy === 0 && thetaStart === 0) {
                uOffset = 0.5 / widthSegments;
            } else if (iy === heightSegments && thetaEnd === Math.PI) {
                uOffset = -0.5 / widthSegments;
            }
            for(let ix = 0; ix <= widthSegments; ix++){
                const u = ix / widthSegments;
                vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertices.push(vertex.x, vertex.y, vertex.z);
                normal.copy(vertex).normalize();
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(u + uOffset, 1 - v);
                verticesRow.push(index++);
            }
            grid.push(verticesRow);
        }
        for(let iy1 = 0; iy1 < heightSegments; iy1++){
            for(let ix1 = 0; ix1 < widthSegments; ix1++){
                const a = grid[iy1][ix1 + 1];
                const b = grid[iy1][ix1];
                const c = grid[iy1 + 1][ix1];
                const d = grid[iy1 + 1][ix1 + 1];
                if (iy1 !== 0 || thetaStart > 0) indices.push(a, b, d);
                if (iy1 !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
    }
}
class TetrahedronGeometry extends PolyhedronGeometry {
    constructor(radius = 1, detail = 0){
        const vertices = [
            1,
            1,
            1,
            -1,
            -1,
            1,
            -1,
            1,
            -1,
            1,
            -1,
            -1
        ];
        const indices = [
            2,
            1,
            0,
            0,
            3,
            2,
            1,
            3,
            0,
            2,
            3,
            1
        ];
        super(vertices, indices, radius, detail);
        this.type = 'TetrahedronGeometry';
        this.parameters = {
            radius: radius,
            detail: detail
        };
    }
    static fromJSON(data) {
        return new TetrahedronGeometry(data.radius, data.detail);
    }
}
class TorusGeometry extends BufferGeometry {
    constructor(radius = 1, tube = 0.4, radialSegments = 12, tubularSegments = 48, arc = Math.PI * 2){
        super();
        this.type = 'TorusGeometry';
        this.parameters = {
            radius: radius,
            tube: tube,
            radialSegments: radialSegments,
            tubularSegments: tubularSegments,
            arc: arc
        };
        radialSegments = Math.floor(radialSegments);
        tubularSegments = Math.floor(tubularSegments);
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        const center = new Vector3();
        const vertex = new Vector3();
        const normal = new Vector3();
        for(let j = 0; j <= radialSegments; j++){
            for(let i = 0; i <= tubularSegments; i++){
                const u = i / tubularSegments * arc;
                const v = j / radialSegments * Math.PI * 2;
                vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);
                vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);
                vertex.z = tube * Math.sin(v);
                vertices.push(vertex.x, vertex.y, vertex.z);
                center.x = radius * Math.cos(u);
                center.y = radius * Math.sin(u);
                normal.subVectors(vertex, center).normalize();
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(i / tubularSegments);
                uvs.push(j / radialSegments);
            }
        }
        for(let j1 = 1; j1 <= radialSegments; j1++){
            for(let i1 = 1; i1 <= tubularSegments; i1++){
                const a = (tubularSegments + 1) * j1 + i1 - 1;
                const b = (tubularSegments + 1) * (j1 - 1) + i1 - 1;
                const c = (tubularSegments + 1) * (j1 - 1) + i1;
                const d = (tubularSegments + 1) * j1 + i1;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new TorusGeometry(data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc);
    }
}
class TorusKnotGeometry extends BufferGeometry {
    constructor(radius = 1, tube = 0.4, tubularSegments = 64, radialSegments = 8, p = 2, q = 3){
        super();
        this.type = 'TorusKnotGeometry';
        this.parameters = {
            radius: radius,
            tube: tube,
            tubularSegments: tubularSegments,
            radialSegments: radialSegments,
            p: p,
            q: q
        };
        tubularSegments = Math.floor(tubularSegments);
        radialSegments = Math.floor(radialSegments);
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        const vertex = new Vector3();
        const normal = new Vector3();
        const P1 = new Vector3();
        const P2 = new Vector3();
        const B = new Vector3();
        const T = new Vector3();
        const N = new Vector3();
        for(let i = 0; i <= tubularSegments; ++i){
            const u = i / tubularSegments * p * Math.PI * 2;
            calculatePositionOnCurve(u, p, q, radius, P1);
            calculatePositionOnCurve(u + 0.01, p, q, radius, P2);
            T.subVectors(P2, P1);
            N.addVectors(P2, P1);
            B.crossVectors(T, N);
            N.crossVectors(B, T);
            B.normalize();
            N.normalize();
            for(let j = 0; j <= radialSegments; ++j){
                const v = j / radialSegments * Math.PI * 2;
                const cx = -tube * Math.cos(v);
                const cy = tube * Math.sin(v);
                vertex.x = P1.x + (cx * N.x + cy * B.x);
                vertex.y = P1.y + (cx * N.y + cy * B.y);
                vertex.z = P1.z + (cx * N.z + cy * B.z);
                vertices.push(vertex.x, vertex.y, vertex.z);
                normal.subVectors(vertex, P1).normalize();
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(i / tubularSegments);
                uvs.push(j / radialSegments);
            }
        }
        for(let j1 = 1; j1 <= tubularSegments; j1++){
            for(let i1 = 1; i1 <= radialSegments; i1++){
                const a = (radialSegments + 1) * (j1 - 1) + (i1 - 1);
                const b = (radialSegments + 1) * j1 + (i1 - 1);
                const c = (radialSegments + 1) * j1 + i1;
                const d = (radialSegments + 1) * (j1 - 1) + i1;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        function calculatePositionOnCurve(u, p, q, radius, position) {
            const cu = Math.cos(u);
            const su = Math.sin(u);
            const quOverP = q / p * u;
            const cs = Math.cos(quOverP);
            position.x = radius * (2 + cs) * 0.5 * cu;
            position.y = radius * (2 + cs) * su * 0.5;
            position.z = radius * Math.sin(quOverP) * 0.5;
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    static fromJSON(data) {
        return new TorusKnotGeometry(data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q);
    }
}
class TubeGeometry extends BufferGeometry {
    constructor(path = new QuadraticBezierCurve3(new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0)), tubularSegments = 64, radius = 1, radialSegments = 8, closed = false){
        super();
        this.type = 'TubeGeometry';
        this.parameters = {
            path: path,
            tubularSegments: tubularSegments,
            radius: radius,
            radialSegments: radialSegments,
            closed: closed
        };
        const frames = path.computeFrenetFrames(tubularSegments, closed);
        this.tangents = frames.tangents;
        this.normals = frames.normals;
        this.binormals = frames.binormals;
        const vertex = new Vector3();
        const normal = new Vector3();
        const uv = new Vector2();
        let P = new Vector3();
        const vertices = [];
        const normals = [];
        const uvs = [];
        const indices = [];
        generateBufferData();
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        function generateBufferData() {
            for(let i = 0; i < tubularSegments; i++){
                generateSegment(i);
            }
            generateSegment(closed === false ? tubularSegments : 0);
            generateUVs();
            generateIndices();
        }
        function generateSegment(i) {
            P = path.getPointAt(i / tubularSegments, P);
            const N = frames.normals[i];
            const B = frames.binormals[i];
            for(let j = 0; j <= radialSegments; j++){
                const v = j / radialSegments * Math.PI * 2;
                const sin = Math.sin(v);
                const cos = -Math.cos(v);
                normal.x = cos * N.x + sin * B.x;
                normal.y = cos * N.y + sin * B.y;
                normal.z = cos * N.z + sin * B.z;
                normal.normalize();
                normals.push(normal.x, normal.y, normal.z);
                vertex.x = P.x + radius * normal.x;
                vertex.y = P.y + radius * normal.y;
                vertex.z = P.z + radius * normal.z;
                vertices.push(vertex.x, vertex.y, vertex.z);
            }
        }
        function generateIndices() {
            for(let j = 1; j <= tubularSegments; j++){
                for(let i = 1; i <= radialSegments; i++){
                    const a = (radialSegments + 1) * (j - 1) + (i - 1);
                    const b = (radialSegments + 1) * j + (i - 1);
                    const c = (radialSegments + 1) * j + i;
                    const d = (radialSegments + 1) * (j - 1) + i;
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                }
            }
        }
        function generateUVs() {
            for(let i = 0; i <= tubularSegments; i++){
                for(let j = 0; j <= radialSegments; j++){
                    uv.x = i / tubularSegments;
                    uv.y = j / radialSegments;
                    uvs.push(uv.x, uv.y);
                }
            }
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
    toJSON() {
        const data = super.toJSON();
        data.path = this.parameters.path.toJSON();
        return data;
    }
    static fromJSON(data) {
        return new TubeGeometry(new Curves[data.path.type]().fromJSON(data.path), data.tubularSegments, data.radius, data.radialSegments, data.closed);
    }
}
class WireframeGeometry extends BufferGeometry {
    constructor(geometry = null){
        super();
        this.type = 'WireframeGeometry';
        this.parameters = {
            geometry: geometry
        };
        if (geometry !== null) {
            const vertices = [];
            const edges = new Set();
            const start = new Vector3();
            const end = new Vector3();
            if (geometry.index !== null) {
                const position = geometry.attributes.position;
                const indices = geometry.index;
                let groups = geometry.groups;
                if (groups.length === 0) {
                    groups = [
                        {
                            start: 0,
                            count: indices.count,
                            materialIndex: 0
                        }
                    ];
                }
                for(let o = 0, ol = groups.length; o < ol; ++o){
                    const group = groups[o];
                    const groupStart = group.start;
                    const groupCount = group.count;
                    for(let i = groupStart, l = groupStart + groupCount; i < l; i += 3){
                        for(let j = 0; j < 3; j++){
                            const index1 = indices.getX(i + j);
                            const index2 = indices.getX(i + (j + 1) % 3);
                            start.fromBufferAttribute(position, index1);
                            end.fromBufferAttribute(position, index2);
                            if (isUniqueEdge(start, end, edges) === true) {
                                vertices.push(start.x, start.y, start.z);
                                vertices.push(end.x, end.y, end.z);
                            }
                        }
                    }
                }
            } else {
                const position1 = geometry.attributes.position;
                for(let i1 = 0, l1 = position1.count / 3; i1 < l1; i1++){
                    for(let j1 = 0; j1 < 3; j1++){
                        const index11 = 3 * i1 + j1;
                        const index21 = 3 * i1 + (j1 + 1) % 3;
                        start.fromBufferAttribute(position1, index11);
                        end.fromBufferAttribute(position1, index21);
                        if (isUniqueEdge(start, end, edges) === true) {
                            vertices.push(start.x, start.y, start.z);
                            vertices.push(end.x, end.y, end.z);
                        }
                    }
                }
            }
            this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        }
    }
    copy(source) {
        super.copy(source);
        this.parameters = Object.assign({}, source.parameters);
        return this;
    }
}
function isUniqueEdge(start, end, edges) {
    const hash1 = `${start.x},${start.y},${start.z}-${end.x},${end.y},${end.z}`;
    const hash2 = `${end.x},${end.y},${end.z}-${start.x},${start.y},${start.z}`;
    if (edges.has(hash1) === true || edges.has(hash2) === true) {
        return false;
    } else {
        edges.add(hash1);
        edges.add(hash2);
        return true;
    }
}
Object.freeze({
    __proto__: null,
    BoxGeometry: BoxGeometry,
    CapsuleGeometry: CapsuleGeometry,
    CircleGeometry: CircleGeometry,
    ConeGeometry: ConeGeometry,
    CylinderGeometry: CylinderGeometry,
    DodecahedronGeometry: DodecahedronGeometry,
    EdgesGeometry: EdgesGeometry,
    ExtrudeGeometry: ExtrudeGeometry,
    IcosahedronGeometry: IcosahedronGeometry,
    LatheGeometry: LatheGeometry,
    OctahedronGeometry: OctahedronGeometry,
    PlaneGeometry: PlaneGeometry,
    PolyhedronGeometry: PolyhedronGeometry,
    RingGeometry: RingGeometry,
    ShapeGeometry: ShapeGeometry,
    SphereGeometry: SphereGeometry,
    TetrahedronGeometry: TetrahedronGeometry,
    TorusGeometry: TorusGeometry,
    TorusKnotGeometry: TorusKnotGeometry,
    TubeGeometry: TubeGeometry,
    WireframeGeometry: WireframeGeometry
});
class MeshPhongMaterial extends Material {
    constructor(parameters){
        super();
        this.isMeshPhongMaterial = true;
        this.type = 'MeshPhongMaterial';
        this.color = new Color(0xffffff);
        this.specular = new Color(0x111111);
        this.shininess = 30;
        this.map = null;
        this.lightMap = null;
        this.lightMapIntensity = 1.0;
        this.aoMap = null;
        this.aoMapIntensity = 1.0;
        this.emissive = new Color(0x000000);
        this.emissiveIntensity = 1.0;
        this.emissiveMap = null;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalMapType = TangentSpaceNormalMap;
        this.normalScale = new Vector2(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.specularMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.combine = MultiplyOperation;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = 'round';
        this.wireframeLinejoin = 'round';
        this.flatShading = false;
        this.fog = true;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.specular.copy(source.specular);
        this.shininess = source.shininess;
        this.map = source.map;
        this.lightMap = source.lightMap;
        this.lightMapIntensity = source.lightMapIntensity;
        this.aoMap = source.aoMap;
        this.aoMapIntensity = source.aoMapIntensity;
        this.emissive.copy(source.emissive);
        this.emissiveMap = source.emissiveMap;
        this.emissiveIntensity = source.emissiveIntensity;
        this.bumpMap = source.bumpMap;
        this.bumpScale = source.bumpScale;
        this.normalMap = source.normalMap;
        this.normalMapType = source.normalMapType;
        this.normalScale.copy(source.normalScale);
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        this.specularMap = source.specularMap;
        this.alphaMap = source.alphaMap;
        this.envMap = source.envMap;
        this.combine = source.combine;
        this.reflectivity = source.reflectivity;
        this.refractionRatio = source.refractionRatio;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.wireframeLinecap = source.wireframeLinecap;
        this.wireframeLinejoin = source.wireframeLinejoin;
        this.flatShading = source.flatShading;
        this.fog = source.fog;
        return this;
    }
}
function arraySlice(array, from, to) {
    if (isTypedArray(array)) {
        return new array.constructor(array.subarray(from, to !== undefined ? to : array.length));
    }
    return array.slice(from, to);
}
function convertArray(array, type, forceClone) {
    if (!array || !forceClone && array.constructor === type) return array;
    if (typeof type.BYTES_PER_ELEMENT === 'number') {
        return new type(array);
    }
    return Array.prototype.slice.call(array);
}
function isTypedArray(object) {
    return ArrayBuffer.isView(object) && !(object instanceof DataView);
}
class Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        this.parameterPositions = parameterPositions;
        this._cachedIndex = 0;
        this.resultBuffer = resultBuffer !== undefined ? resultBuffer : new sampleValues.constructor(sampleSize);
        this.sampleValues = sampleValues;
        this.valueSize = sampleSize;
        this.settings = null;
        this.DefaultSettings_ = {};
    }
    evaluate(t) {
        const pp = this.parameterPositions;
        let i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
        validate_interval: {
            seek: {
                let right;
                linear_scan: {
                    forward_scan: if (!(t < t1)) {
                        for(let giveUpAt = i1 + 2;;){
                            if (t1 === undefined) {
                                if (t < t0) break forward_scan;
                                i1 = pp.length;
                                this._cachedIndex = i1;
                                return this.copySampleValue_(i1 - 1);
                            }
                            if (i1 === giveUpAt) break;
                            t0 = t1;
                            t1 = pp[++i1];
                            if (t < t1) {
                                break seek;
                            }
                        }
                        right = pp.length;
                        break linear_scan;
                    }
                    if (!(t >= t0)) {
                        const t1global = pp[1];
                        if (t < t1global) {
                            i1 = 2;
                            t0 = t1global;
                        }
                        for(let giveUpAt1 = i1 - 2;;){
                            if (t0 === undefined) {
                                this._cachedIndex = 0;
                                return this.copySampleValue_(0);
                            }
                            if (i1 === giveUpAt1) break;
                            t1 = t0;
                            t0 = pp[--i1 - 1];
                            if (t >= t0) {
                                break seek;
                            }
                        }
                        right = i1;
                        i1 = 0;
                        break linear_scan;
                    }
                    break validate_interval;
                }
                while(i1 < right){
                    const mid = i1 + right >>> 1;
                    if (t < pp[mid]) {
                        right = mid;
                    } else {
                        i1 = mid + 1;
                    }
                }
                t1 = pp[i1];
                t0 = pp[i1 - 1];
                if (t0 === undefined) {
                    this._cachedIndex = 0;
                    return this.copySampleValue_(0);
                }
                if (t1 === undefined) {
                    i1 = pp.length;
                    this._cachedIndex = i1;
                    return this.copySampleValue_(i1 - 1);
                }
            }
            this._cachedIndex = i1;
            this.intervalChanged_(i1, t0, t1);
        }
        return this.interpolate_(i1, t0, t, t1);
    }
    getSettings_() {
        return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(index) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
        for(let i = 0; i !== stride; ++i){
            result[i] = values[offset + i];
        }
        return result;
    }
    interpolate_() {
        throw new Error('call to abstract method');
    }
    intervalChanged_() {}
}
class CubicInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
        this._weightPrev = -0;
        this._offsetPrev = -0;
        this._weightNext = -0;
        this._offsetNext = -0;
        this.DefaultSettings_ = {
            endingStart: ZeroCurvatureEnding,
            endingEnd: ZeroCurvatureEnding
        };
    }
    intervalChanged_(i1, t0, t1) {
        const pp = this.parameterPositions;
        let iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
        if (tPrev === undefined) {
            switch(this.getSettings_().endingStart){
                case 2401:
                    iPrev = i1;
                    tPrev = 2 * t0 - t1;
                    break;
                case 2402:
                    iPrev = pp.length - 2;
                    tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
                    break;
                default:
                    iPrev = i1;
                    tPrev = t1;
            }
        }
        if (tNext === undefined) {
            switch(this.getSettings_().endingEnd){
                case 2401:
                    iNext = i1;
                    tNext = 2 * t1 - t0;
                    break;
                case 2402:
                    iNext = 1;
                    tNext = t1 + pp[1] - pp[0];
                    break;
                default:
                    iNext = i1 - 1;
                    tNext = t0;
            }
        }
        const halfDt = (t1 - t0) * 0.5, stride = this.valueSize;
        this._weightPrev = halfDt / (t0 - tPrev);
        this._weightNext = halfDt / (tNext - t1);
        this._offsetPrev = iPrev * stride;
        this._offsetNext = iNext * stride;
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p = (t - t0) / (t1 - t0), pp = p * p, ppp = pp * p;
        const sP = -wP * ppp + 2 * wP * pp - wP * p;
        const s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-0.5 + wP) * p + 1;
        const s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + 0.5 * p;
        const sN = wN * ppp - wN * pp;
        for(let i = 0; i !== stride; ++i){
            result[i] = sP * values[oP + i] + s0 * values[o0 + i] + s1 * values[o1 + i] + sN * values[oN + i];
        }
        return result;
    }
}
class LinearInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
        for(let i = 0; i !== stride; ++i){
            result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
        }
        return result;
    }
}
class DiscreteInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1) {
        return this.copySampleValue_(i1 - 1);
    }
}
class KeyframeTrack {
    constructor(name, times, values, interpolation){
        if (name === undefined) throw new Error('THREE.KeyframeTrack: track name is undefined');
        if (times === undefined || times.length === 0) throw new Error('THREE.KeyframeTrack: no keyframes in track named ' + name);
        this.name = name;
        this.times = convertArray(times, this.TimeBufferType);
        this.values = convertArray(values, this.ValueBufferType);
        this.setInterpolation(interpolation || this.DefaultInterpolation);
    }
    static toJSON(track) {
        const trackType = track.constructor;
        let json;
        if (trackType.toJSON !== this.toJSON) {
            json = trackType.toJSON(track);
        } else {
            json = {
                'name': track.name,
                'times': convertArray(track.times, Array),
                'values': convertArray(track.values, Array)
            };
            const interpolation = track.getInterpolation();
            if (interpolation !== track.DefaultInterpolation) {
                json.interpolation = interpolation;
            }
        }
        json.type = track.ValueTypeName;
        return json;
    }
    InterpolantFactoryMethodDiscrete(result) {
        return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    InterpolantFactoryMethodLinear(result) {
        return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    InterpolantFactoryMethodSmooth(result) {
        return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    setInterpolation(interpolation) {
        let factoryMethod;
        switch(interpolation){
            case 2300:
                factoryMethod = this.InterpolantFactoryMethodDiscrete;
                break;
            case 2301:
                factoryMethod = this.InterpolantFactoryMethodLinear;
                break;
            case 2302:
                factoryMethod = this.InterpolantFactoryMethodSmooth;
                break;
        }
        if (factoryMethod === undefined) {
            const message = 'unsupported interpolation for ' + this.ValueTypeName + ' keyframe track named ' + this.name;
            if (this.createInterpolant === undefined) {
                if (interpolation !== this.DefaultInterpolation) {
                    this.setInterpolation(this.DefaultInterpolation);
                } else {
                    throw new Error(message);
                }
            }
            console.warn('THREE.KeyframeTrack:', message);
            return this;
        }
        this.createInterpolant = factoryMethod;
        return this;
    }
    getInterpolation() {
        switch(this.createInterpolant){
            case this.InterpolantFactoryMethodDiscrete:
                return 2300;
            case this.InterpolantFactoryMethodLinear:
                return 2301;
            case this.InterpolantFactoryMethodSmooth:
                return 2302;
        }
    }
    getValueSize() {
        return this.values.length / this.times.length;
    }
    shift(timeOffset) {
        if (timeOffset !== 0.0) {
            const times = this.times;
            for(let i = 0, n = times.length; i !== n; ++i){
                times[i] += timeOffset;
            }
        }
        return this;
    }
    scale(timeScale) {
        if (timeScale !== 1.0) {
            const times = this.times;
            for(let i = 0, n = times.length; i !== n; ++i){
                times[i] *= timeScale;
            }
        }
        return this;
    }
    trim(startTime, endTime) {
        const times = this.times, nKeys = times.length;
        let from = 0, to = nKeys - 1;
        while(from !== nKeys && times[from] < startTime){
            ++from;
        }
        while(to !== -1 && times[to] > endTime){
            --to;
        }
        ++to;
        if (from !== 0 || to !== nKeys) {
            if (from >= to) {
                to = Math.max(to, 1);
                from = to - 1;
            }
            const stride = this.getValueSize();
            this.times = arraySlice(times, from, to);
            this.values = arraySlice(this.values, from * stride, to * stride);
        }
        return this;
    }
    validate() {
        let valid = true;
        const valueSize = this.getValueSize();
        if (valueSize - Math.floor(valueSize) !== 0) {
            console.error('THREE.KeyframeTrack: Invalid value size in track.', this);
            valid = false;
        }
        const times = this.times, values = this.values, nKeys = times.length;
        if (nKeys === 0) {
            console.error('THREE.KeyframeTrack: Track is empty.', this);
            valid = false;
        }
        let prevTime = null;
        for(let i = 0; i !== nKeys; i++){
            const currTime = times[i];
            if (typeof currTime === 'number' && isNaN(currTime)) {
                console.error('THREE.KeyframeTrack: Time is not a valid number.', this, i, currTime);
                valid = false;
                break;
            }
            if (prevTime !== null && prevTime > currTime) {
                console.error('THREE.KeyframeTrack: Out of order keys.', this, i, currTime, prevTime);
                valid = false;
                break;
            }
            prevTime = currTime;
        }
        if (values !== undefined) {
            if (isTypedArray(values)) {
                for(let i1 = 0, n = values.length; i1 !== n; ++i1){
                    const value = values[i1];
                    if (isNaN(value)) {
                        console.error('THREE.KeyframeTrack: Value is not a valid number.', this, i1, value);
                        valid = false;
                        break;
                    }
                }
            }
        }
        return valid;
    }
    optimize() {
        const times = arraySlice(this.times), values = arraySlice(this.values), stride = this.getValueSize(), smoothInterpolation = this.getInterpolation() === 2302, lastIndex = times.length - 1;
        let writeIndex = 1;
        for(let i = 1; i < lastIndex; ++i){
            let keep = false;
            const time = times[i];
            const timeNext = times[i + 1];
            if (time !== timeNext && (i !== 1 || time !== times[0])) {
                if (!smoothInterpolation) {
                    const offset = i * stride, offsetP = offset - stride, offsetN = offset + stride;
                    for(let j = 0; j !== stride; ++j){
                        const value = values[offset + j];
                        if (value !== values[offsetP + j] || value !== values[offsetN + j]) {
                            keep = true;
                            break;
                        }
                    }
                } else {
                    keep = true;
                }
            }
            if (keep) {
                if (i !== writeIndex) {
                    times[writeIndex] = times[i];
                    const readOffset = i * stride, writeOffset = writeIndex * stride;
                    for(let j1 = 0; j1 !== stride; ++j1){
                        values[writeOffset + j1] = values[readOffset + j1];
                    }
                }
                ++writeIndex;
            }
        }
        if (lastIndex > 0) {
            times[writeIndex] = times[lastIndex];
            for(let readOffset1 = lastIndex * stride, writeOffset1 = writeIndex * stride, j2 = 0; j2 !== stride; ++j2){
                values[writeOffset1 + j2] = values[readOffset1 + j2];
            }
            ++writeIndex;
        }
        if (writeIndex !== times.length) {
            this.times = arraySlice(times, 0, writeIndex);
            this.values = arraySlice(values, 0, writeIndex * stride);
        } else {
            this.times = times;
            this.values = values;
        }
        return this;
    }
    clone() {
        const times = arraySlice(this.times, 0);
        const values = arraySlice(this.values, 0);
        const TypedKeyframeTrack = this.constructor;
        const track = new TypedKeyframeTrack(this.name, times, values);
        track.createInterpolant = this.createInterpolant;
        return track;
    }
}
KeyframeTrack.prototype.TimeBufferType = Float32Array;
KeyframeTrack.prototype.ValueBufferType = Float32Array;
KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
class BooleanKeyframeTrack extends KeyframeTrack {
}
BooleanKeyframeTrack.prototype.ValueTypeName = 'bool';
BooleanKeyframeTrack.prototype.ValueBufferType = Array;
BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = undefined;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = undefined;
class ColorKeyframeTrack extends KeyframeTrack {
}
ColorKeyframeTrack.prototype.ValueTypeName = 'color';
class NumberKeyframeTrack extends KeyframeTrack {
}
NumberKeyframeTrack.prototype.ValueTypeName = 'number';
class QuaternionLinearInterpolant extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, alpha = (t - t0) / (t1 - t0);
        let offset = i1 * stride;
        for(let end = offset + stride; offset !== end; offset += 4){
            Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
        }
        return result;
    }
}
class QuaternionKeyframeTrack extends KeyframeTrack {
    InterpolantFactoryMethodLinear(result) {
        return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
    }
}
QuaternionKeyframeTrack.prototype.ValueTypeName = 'quaternion';
QuaternionKeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = undefined;
class StringKeyframeTrack extends KeyframeTrack {
}
StringKeyframeTrack.prototype.ValueTypeName = 'string';
StringKeyframeTrack.prototype.ValueBufferType = Array;
StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = undefined;
StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = undefined;
class VectorKeyframeTrack extends KeyframeTrack {
}
VectorKeyframeTrack.prototype.ValueTypeName = 'vector';
class LoadingManager {
    constructor(onLoad, onProgress, onError){
        const scope = this;
        let isLoading = false;
        let itemsLoaded = 0;
        let itemsTotal = 0;
        let urlModifier = undefined;
        const handlers = [];
        this.onStart = undefined;
        this.onLoad = onLoad;
        this.onProgress = onProgress;
        this.onError = onError;
        this.itemStart = function(url) {
            itemsTotal++;
            if (isLoading === false) {
                if (scope.onStart !== undefined) {
                    scope.onStart(url, itemsLoaded, itemsTotal);
                }
            }
            isLoading = true;
        };
        this.itemEnd = function(url) {
            itemsLoaded++;
            if (scope.onProgress !== undefined) {
                scope.onProgress(url, itemsLoaded, itemsTotal);
            }
            if (itemsLoaded === itemsTotal) {
                isLoading = false;
                if (scope.onLoad !== undefined) {
                    scope.onLoad();
                }
            }
        };
        this.itemError = function(url) {
            if (scope.onError !== undefined) {
                scope.onError(url);
            }
        };
        this.resolveURL = function(url) {
            if (urlModifier) {
                return urlModifier(url);
            }
            return url;
        };
        this.setURLModifier = function(transform) {
            urlModifier = transform;
            return this;
        };
        this.addHandler = function(regex, loader) {
            handlers.push(regex, loader);
            return this;
        };
        this.removeHandler = function(regex) {
            const index = handlers.indexOf(regex);
            if (index !== -1) {
                handlers.splice(index, 2);
            }
            return this;
        };
        this.getHandler = function(file) {
            for(let i = 0, l = handlers.length; i < l; i += 2){
                const regex = handlers[i];
                const loader = handlers[i + 1];
                if (regex.global) regex.lastIndex = 0;
                if (regex.test(file)) {
                    return loader;
                }
            }
            return null;
        };
    }
}
new LoadingManager();
class Light extends Object3D {
    constructor(color, intensity = 1){
        super();
        this.isLight = true;
        this.type = 'Light';
        this.color = new Color(color);
        this.intensity = intensity;
    }
    dispose() {}
    copy(source, recursive) {
        super.copy(source, recursive);
        this.color.copy(source.color);
        this.intensity = source.intensity;
        return this;
    }
    toJSON(meta) {
        const data = super.toJSON(meta);
        data.object.color = this.color.getHex();
        data.object.intensity = this.intensity;
        if (this.groundColor !== undefined) data.object.groundColor = this.groundColor.getHex();
        if (this.distance !== undefined) data.object.distance = this.distance;
        if (this.angle !== undefined) data.object.angle = this.angle;
        if (this.decay !== undefined) data.object.decay = this.decay;
        if (this.penumbra !== undefined) data.object.penumbra = this.penumbra;
        if (this.shadow !== undefined) data.object.shadow = this.shadow.toJSON();
        return data;
    }
}
const _projScreenMatrix$1 = new Matrix4();
const _lightPositionWorld$1 = new Vector3();
const _lookTarget$1 = new Vector3();
class LightShadow {
    constructor(camera){
        this.camera = camera;
        this.bias = 0;
        this.normalBias = 0;
        this.radius = 1;
        this.blurSamples = 8;
        this.mapSize = new Vector2(512, 512);
        this.map = null;
        this.mapPass = null;
        this.matrix = new Matrix4();
        this.autoUpdate = true;
        this.needsUpdate = false;
        this._frustum = new Frustum();
        this._frameExtents = new Vector2(1, 1);
        this._viewportCount = 1;
        this._viewports = [
            new Vector4(0, 0, 1, 1)
        ];
    }
    getViewportCount() {
        return this._viewportCount;
    }
    getFrustum() {
        return this._frustum;
    }
    updateMatrices(light) {
        const shadowCamera = this.camera;
        const shadowMatrix = this.matrix;
        _lightPositionWorld$1.setFromMatrixPosition(light.matrixWorld);
        shadowCamera.position.copy(_lightPositionWorld$1);
        _lookTarget$1.setFromMatrixPosition(light.target.matrixWorld);
        shadowCamera.lookAt(_lookTarget$1);
        shadowCamera.updateMatrixWorld();
        _projScreenMatrix$1.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse);
        this._frustum.setFromProjectionMatrix(_projScreenMatrix$1);
        shadowMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0);
        shadowMatrix.multiply(_projScreenMatrix$1);
    }
    getViewport(viewportIndex) {
        return this._viewports[viewportIndex];
    }
    getFrameExtents() {
        return this._frameExtents;
    }
    dispose() {
        if (this.map) {
            this.map.dispose();
        }
        if (this.mapPass) {
            this.mapPass.dispose();
        }
    }
    copy(source) {
        this.camera = source.camera.clone();
        this.bias = source.bias;
        this.radius = source.radius;
        this.mapSize.copy(source.mapSize);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    toJSON() {
        const object = {};
        if (this.bias !== 0) object.bias = this.bias;
        if (this.normalBias !== 0) object.normalBias = this.normalBias;
        if (this.radius !== 1) object.radius = this.radius;
        if (this.mapSize.x !== 512 || this.mapSize.y !== 512) object.mapSize = this.mapSize.toArray();
        object.camera = this.camera.toJSON(false).object;
        delete object.camera.matrix;
        return object;
    }
}
const _projScreenMatrix = new Matrix4();
const _lightPositionWorld = new Vector3();
const _lookTarget = new Vector3();
class PointLightShadow extends LightShadow {
    constructor(){
        super(new PerspectiveCamera(90, 1, 0.5, 500));
        this.isPointLightShadow = true;
        this._frameExtents = new Vector2(4, 2);
        this._viewportCount = 6;
        this._viewports = [
            new Vector4(2, 1, 1, 1),
            new Vector4(0, 1, 1, 1),
            new Vector4(3, 1, 1, 1),
            new Vector4(1, 1, 1, 1),
            new Vector4(3, 0, 1, 1),
            new Vector4(1, 0, 1, 1)
        ];
        this._cubeDirections = [
            new Vector3(1, 0, 0),
            new Vector3(-1, 0, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, -1),
            new Vector3(0, 1, 0),
            new Vector3(0, -1, 0)
        ];
        this._cubeUps = [
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, -1)
        ];
    }
    updateMatrices(light, viewportIndex = 0) {
        const camera = this.camera;
        const shadowMatrix = this.matrix;
        const far = light.distance || camera.far;
        if (far !== camera.far) {
            camera.far = far;
            camera.updateProjectionMatrix();
        }
        _lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
        camera.position.copy(_lightPositionWorld);
        _lookTarget.copy(camera.position);
        _lookTarget.add(this._cubeDirections[viewportIndex]);
        camera.up.copy(this._cubeUps[viewportIndex]);
        camera.lookAt(_lookTarget);
        camera.updateMatrixWorld();
        shadowMatrix.makeTranslation(-_lightPositionWorld.x, -_lightPositionWorld.y, -_lightPositionWorld.z);
        _projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        this._frustum.setFromProjectionMatrix(_projScreenMatrix);
    }
}
class PointLight extends Light {
    constructor(color, intensity, distance = 0, decay = 2){
        super(color, intensity);
        this.isPointLight = true;
        this.type = 'PointLight';
        this.distance = distance;
        this.decay = decay;
        this.shadow = new PointLightShadow();
    }
    get power() {
        return this.intensity * 4 * Math.PI;
    }
    set power(power) {
        this.intensity = power / (4 * Math.PI);
    }
    dispose() {
        this.shadow.dispose();
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.distance = source.distance;
        this.decay = source.decay;
        this.shadow = source.shadow.clone();
        return this;
    }
}
class AmbientLight extends Light {
    constructor(color, intensity){
        super(color, intensity);
        this.isAmbientLight = true;
        this.type = 'AmbientLight';
    }
}
new Matrix4();
new Matrix4();
new Matrix4();
new Vector3();
new Quaternion();
new Vector3();
new Vector3();
new Vector3();
new Quaternion();
new Vector3();
new Vector3();
const _RESERVED_CHARS_RE = '\\[\\]\\.:\\/';
const _reservedRe = new RegExp('[' + _RESERVED_CHARS_RE + ']', 'g');
const _wordChar = '[^' + _RESERVED_CHARS_RE + ']';
const _wordCharOrDot = '[^' + _RESERVED_CHARS_RE.replace('\\.', '') + ']';
const _directoryRe = /((?:WC+[\/:])*)/.source.replace('WC', _wordChar);
const _nodeRe = /(WCOD+)?/.source.replace('WCOD', _wordCharOrDot);
const _objectRe = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace('WC', _wordChar);
const _propertyRe = /\.(WC+)(?:\[(.+)\])?/.source.replace('WC', _wordChar);
const _trackRe = new RegExp('' + '^' + _directoryRe + _nodeRe + _objectRe + _propertyRe + '$');
const _supportedObjectNames = [
    'material',
    'materials',
    'bones',
    'map'
];
class Composite {
    constructor(targetGroup, path, optionalParsedPath){
        const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
        this._targetGroup = targetGroup;
        this._bindings = targetGroup.subscribe_(path, parsedPath);
    }
    getValue(array, offset) {
        this.bind();
        const firstValidIndex = this._targetGroup.nCachedObjects_, binding = this._bindings[firstValidIndex];
        if (binding !== undefined) binding.getValue(array, offset);
    }
    setValue(array, offset) {
        const bindings = this._bindings;
        for(let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i){
            bindings[i].setValue(array, offset);
        }
    }
    bind() {
        const bindings = this._bindings;
        for(let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i){
            bindings[i].bind();
        }
    }
    unbind() {
        const bindings = this._bindings;
        for(let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i){
            bindings[i].unbind();
        }
    }
}
class PropertyBinding {
    constructor(rootNode, path, parsedPath){
        this.path = path;
        this.parsedPath = parsedPath || PropertyBinding.parseTrackName(path);
        this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
        this.rootNode = rootNode;
        this.getValue = this._getValue_unbound;
        this.setValue = this._setValue_unbound;
    }
    static create(root, path, parsedPath) {
        if (!(root && root.isAnimationObjectGroup)) {
            return new PropertyBinding(root, path, parsedPath);
        } else {
            return new PropertyBinding.Composite(root, path, parsedPath);
        }
    }
    static sanitizeNodeName(name) {
        return name.replace(/\s/g, '_').replace(_reservedRe, '');
    }
    static parseTrackName(trackName) {
        const matches = _trackRe.exec(trackName);
        if (matches === null) {
            throw new Error('PropertyBinding: Cannot parse trackName: ' + trackName);
        }
        const results = {
            nodeName: matches[2],
            objectName: matches[3],
            objectIndex: matches[4],
            propertyName: matches[5],
            propertyIndex: matches[6]
        };
        const lastDot = results.nodeName && results.nodeName.lastIndexOf('.');
        if (lastDot !== undefined && lastDot !== -1) {
            const objectName = results.nodeName.substring(lastDot + 1);
            if (_supportedObjectNames.indexOf(objectName) !== -1) {
                results.nodeName = results.nodeName.substring(0, lastDot);
                results.objectName = objectName;
            }
        }
        if (results.propertyName === null || results.propertyName.length === 0) {
            throw new Error('PropertyBinding: can not parse propertyName from trackName: ' + trackName);
        }
        return results;
    }
    static findNode(root, nodeName) {
        if (nodeName === undefined || nodeName === '' || nodeName === '.' || nodeName === -1 || nodeName === root.name || nodeName === root.uuid) {
            return root;
        }
        if (root.skeleton) {
            const bone = root.skeleton.getBoneByName(nodeName);
            if (bone !== undefined) {
                return bone;
            }
        }
        if (root.children) {
            const searchNodeSubtree = function(children) {
                for(let i = 0; i < children.length; i++){
                    const childNode = children[i];
                    if (childNode.name === nodeName || childNode.uuid === nodeName) {
                        return childNode;
                    }
                    const result = searchNodeSubtree(childNode.children);
                    if (result) return result;
                }
                return null;
            };
            const subTreeNode = searchNodeSubtree(root.children);
            if (subTreeNode) {
                return subTreeNode;
            }
        }
        return null;
    }
    _getValue_unavailable() {}
    _setValue_unavailable() {}
    _getValue_direct(buffer, offset) {
        buffer[offset] = this.targetObject[this.propertyName];
    }
    _getValue_array(buffer, offset) {
        const source = this.resolvedProperty;
        for(let i = 0, n = source.length; i !== n; ++i){
            buffer[offset++] = source[i];
        }
    }
    _getValue_arrayElement(buffer, offset) {
        buffer[offset] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(buffer, offset) {
        this.resolvedProperty.toArray(buffer, offset);
    }
    _setValue_direct(buffer, offset) {
        this.targetObject[this.propertyName] = buffer[offset];
    }
    _setValue_direct_setNeedsUpdate(buffer, offset) {
        this.targetObject[this.propertyName] = buffer[offset];
        this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset) {
        this.targetObject[this.propertyName] = buffer[offset];
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(buffer, offset) {
        const dest = this.resolvedProperty;
        for(let i = 0, n = dest.length; i !== n; ++i){
            dest[i] = buffer[offset++];
        }
    }
    _setValue_array_setNeedsUpdate(buffer, offset) {
        const dest = this.resolvedProperty;
        for(let i = 0, n = dest.length; i !== n; ++i){
            dest[i] = buffer[offset++];
        }
        this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(buffer, offset) {
        const dest = this.resolvedProperty;
        for(let i = 0, n = dest.length; i !== n; ++i){
            dest[i] = buffer[offset++];
        }
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(buffer, offset) {
        this.resolvedProperty[this.propertyIndex] = buffer[offset];
    }
    _setValue_arrayElement_setNeedsUpdate(buffer, offset) {
        this.resolvedProperty[this.propertyIndex] = buffer[offset];
        this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset) {
        this.resolvedProperty[this.propertyIndex] = buffer[offset];
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(buffer, offset) {
        this.resolvedProperty.fromArray(buffer, offset);
    }
    _setValue_fromArray_setNeedsUpdate(buffer, offset) {
        this.resolvedProperty.fromArray(buffer, offset);
        this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset) {
        this.resolvedProperty.fromArray(buffer, offset);
        this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(targetArray, offset) {
        this.bind();
        this.getValue(targetArray, offset);
    }
    _setValue_unbound(sourceArray, offset) {
        this.bind();
        this.setValue(sourceArray, offset);
    }
    bind() {
        let targetObject = this.node;
        const parsedPath = this.parsedPath;
        const objectName = parsedPath.objectName;
        const propertyName = parsedPath.propertyName;
        let propertyIndex = parsedPath.propertyIndex;
        if (!targetObject) {
            targetObject = PropertyBinding.findNode(this.rootNode, parsedPath.nodeName);
            this.node = targetObject;
        }
        this.getValue = this._getValue_unavailable;
        this.setValue = this._setValue_unavailable;
        if (!targetObject) {
            console.error('THREE.PropertyBinding: Trying to update node for track: ' + this.path + ' but it wasn\'t found.');
            return;
        }
        if (objectName) {
            let objectIndex = parsedPath.objectIndex;
            switch(objectName){
                case 'materials':
                    if (!targetObject.material) {
                        console.error('THREE.PropertyBinding: Can not bind to material as node does not have a material.', this);
                        return;
                    }
                    if (!targetObject.material.materials) {
                        console.error('THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.', this);
                        return;
                    }
                    targetObject = targetObject.material.materials;
                    break;
                case 'bones':
                    if (!targetObject.skeleton) {
                        console.error('THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.', this);
                        return;
                    }
                    targetObject = targetObject.skeleton.bones;
                    for(let i = 0; i < targetObject.length; i++){
                        if (targetObject[i].name === objectIndex) {
                            objectIndex = i;
                            break;
                        }
                    }
                    break;
                case 'map':
                    if ('map' in targetObject) {
                        targetObject = targetObject.map;
                        break;
                    }
                    if (!targetObject.material) {
                        console.error('THREE.PropertyBinding: Can not bind to material as node does not have a material.', this);
                        return;
                    }
                    if (!targetObject.material.map) {
                        console.error('THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.', this);
                        return;
                    }
                    targetObject = targetObject.material.map;
                    break;
                default:
                    if (targetObject[objectName] === undefined) {
                        console.error('THREE.PropertyBinding: Can not bind to objectName of node undefined.', this);
                        return;
                    }
                    targetObject = targetObject[objectName];
            }
            if (objectIndex !== undefined) {
                if (targetObject[objectIndex] === undefined) {
                    console.error('THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.', this, targetObject);
                    return;
                }
                targetObject = targetObject[objectIndex];
            }
        }
        const nodeProperty = targetObject[propertyName];
        if (nodeProperty === undefined) {
            const nodeName = parsedPath.nodeName;
            console.error('THREE.PropertyBinding: Trying to update property for track: ' + nodeName + '.' + propertyName + ' but it wasn\'t found.', targetObject);
            return;
        }
        let versioning = this.Versioning.None;
        this.targetObject = targetObject;
        if (targetObject.needsUpdate !== undefined) {
            versioning = this.Versioning.NeedsUpdate;
        } else if (targetObject.matrixWorldNeedsUpdate !== undefined) {
            versioning = this.Versioning.MatrixWorldNeedsUpdate;
        }
        let bindingType = this.BindingType.Direct;
        if (propertyIndex !== undefined) {
            if (propertyName === 'morphTargetInfluences') {
                if (!targetObject.geometry) {
                    console.error('THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.', this);
                    return;
                }
                if (!targetObject.geometry.morphAttributes) {
                    console.error('THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.', this);
                    return;
                }
                if (targetObject.morphTargetDictionary[propertyIndex] !== undefined) {
                    propertyIndex = targetObject.morphTargetDictionary[propertyIndex];
                }
            }
            bindingType = this.BindingType.ArrayElement;
            this.resolvedProperty = nodeProperty;
            this.propertyIndex = propertyIndex;
        } else if (nodeProperty.fromArray !== undefined && nodeProperty.toArray !== undefined) {
            bindingType = this.BindingType.HasFromToArray;
            this.resolvedProperty = nodeProperty;
        } else if (Array.isArray(nodeProperty)) {
            bindingType = this.BindingType.EntireArray;
            this.resolvedProperty = nodeProperty;
        } else {
            this.propertyName = propertyName;
        }
        this.getValue = this.GetterByBindingType[bindingType];
        this.setValue = this.SetterByBindingTypeAndVersioning[bindingType][versioning];
    }
    unbind() {
        this.node = null;
        this.getValue = this._getValue_unbound;
        this.setValue = this._setValue_unbound;
    }
}
PropertyBinding.Composite = Composite;
PropertyBinding.prototype.BindingType = {
    Direct: 0,
    EntireArray: 1,
    ArrayElement: 2,
    HasFromToArray: 3
};
PropertyBinding.prototype.Versioning = {
    None: 0,
    NeedsUpdate: 1,
    MatrixWorldNeedsUpdate: 2
};
PropertyBinding.prototype.GetterByBindingType = [
    PropertyBinding.prototype._getValue_direct,
    PropertyBinding.prototype._getValue_array,
    PropertyBinding.prototype._getValue_arrayElement,
    PropertyBinding.prototype._getValue_toArray
];
PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
    [
        PropertyBinding.prototype._setValue_direct,
        PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
        PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
    ],
    [
        PropertyBinding.prototype._setValue_array,
        PropertyBinding.prototype._setValue_array_setNeedsUpdate,
        PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
    ],
    [
        PropertyBinding.prototype._setValue_arrayElement,
        PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
        PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
    ],
    [
        PropertyBinding.prototype._setValue_fromArray,
        PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
        PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
    ]
];
new Float32Array(1);
class Spherical {
    constructor(radius = 1, phi = 0, theta = 0){
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
        return this;
    }
    set(radius, phi, theta) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
        return this;
    }
    copy(other) {
        this.radius = other.radius;
        this.phi = other.phi;
        this.theta = other.theta;
        return this;
    }
    makeSafe() {
        const EPS = 0.000001;
        this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
        return this;
    }
    setFromVector3(v) {
        return this.setFromCartesianCoords(v.x, v.y, v.z);
    }
    setFromCartesianCoords(x, y, z) {
        this.radius = Math.sqrt(x * x + y * y + z * z);
        if (this.radius === 0) {
            this.theta = 0;
            this.phi = 0;
        } else {
            this.theta = Math.atan2(x, z);
            this.phi = Math.acos(clamp(y / this.radius, -1, 1));
        }
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
new Vector2();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Matrix4();
new Matrix4();
new Vector3();
new Color();
new Color();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Camera();
new Box3();
new Vector3();
if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register', {
        detail: {
            revision: REVISION
        }
    }));
}
if (typeof window !== 'undefined') {
    if (window.__THREE__) {
        console.warn('WARNING: Multiple instances of Three.js being imported.');
    } else {
        window.__THREE__ = REVISION;
    }
}
const _changeEvent = {
    type: 'change'
};
const _startEvent = {
    type: 'start'
};
const _endEvent = {
    type: 'end'
};
class OrbitControls extends EventDispatcher {
    constructor(object, domElement){
        super();
        this.object = object;
        this.domElement = domElement;
        this.domElement.style.touchAction = 'none';
        this.enabled = true;
        this.target = new Vector3();
        this.minDistance = 0;
        this.maxDistance = Infinity;
        this.minZoom = 0;
        this.maxZoom = Infinity;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.minAzimuthAngle = -Infinity;
        this.maxAzimuthAngle = Infinity;
        this.enableDamping = false;
        this.dampingFactor = 0.05;
        this.enableZoom = true;
        this.zoomSpeed = 1.0;
        this.enableRotate = true;
        this.rotateSpeed = 1.0;
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = true;
        this.keyPanSpeed = 7.0;
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0;
        this.keys = {
            LEFT: 'ArrowLeft',
            UP: 'ArrowUp',
            RIGHT: 'ArrowRight',
            BOTTOM: 'ArrowDown'
        };
        this.mouseButtons = {
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.PAN
        };
        this.touches = {
            ONE: TOUCH.ROTATE,
            TWO: TOUCH.DOLLY_PAN
        };
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        this._domElementKeyEvents = null;
        this.getPolarAngle = function() {
            return spherical.phi;
        };
        this.getAzimuthalAngle = function() {
            return spherical.theta;
        };
        this.getDistance = function() {
            return this.object.position.distanceTo(this.target);
        };
        this.listenToKeyEvents = function(domElement) {
            domElement.addEventListener('keydown', onKeyDown);
            this._domElementKeyEvents = domElement;
        };
        this.stopListenToKeyEvents = function() {
            this._domElementKeyEvents.removeEventListener('keydown', onKeyDown);
            this._domElementKeyEvents = null;
        };
        this.saveState = function() {
            scope.target0.copy(scope.target);
            scope.position0.copy(scope.object.position);
            scope.zoom0 = scope.object.zoom;
        };
        this.reset = function() {
            scope.target.copy(scope.target0);
            scope.object.position.copy(scope.position0);
            scope.object.zoom = scope.zoom0;
            scope.object.updateProjectionMatrix();
            scope.dispatchEvent(_changeEvent);
            scope.update();
            state = STATE.NONE;
        };
        this.update = function() {
            const offset = new Vector3();
            const quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
            const quatInverse = quat.clone().invert();
            const lastPosition = new Vector3();
            const lastQuaternion = new Quaternion();
            const twoPI = 2 * Math.PI;
            return function update() {
                const position = scope.object.position;
                offset.copy(position).sub(scope.target);
                offset.applyQuaternion(quat);
                spherical.setFromVector3(offset);
                if (scope.autoRotate && state === STATE.NONE) {
                    rotateLeft(getAutoRotationAngle());
                }
                if (scope.enableDamping) {
                    spherical.theta += sphericalDelta.theta * scope.dampingFactor;
                    spherical.phi += sphericalDelta.phi * scope.dampingFactor;
                } else {
                    spherical.theta += sphericalDelta.theta;
                    spherical.phi += sphericalDelta.phi;
                }
                let min = scope.minAzimuthAngle;
                let max = scope.maxAzimuthAngle;
                if (isFinite(min) && isFinite(max)) {
                    if (min < -Math.PI) min += twoPI;
                    else if (min > Math.PI) min -= twoPI;
                    if (max < -Math.PI) max += twoPI;
                    else if (max > Math.PI) max -= twoPI;
                    if (min <= max) {
                        spherical.theta = Math.max(min, Math.min(max, spherical.theta));
                    } else {
                        spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
                    }
                }
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
                spherical.makeSafe();
                spherical.radius *= scale;
                spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));
                if (scope.enableDamping === true) {
                    scope.target.addScaledVector(panOffset, scope.dampingFactor);
                } else {
                    scope.target.add(panOffset);
                }
                offset.setFromSpherical(spherical);
                offset.applyQuaternion(quatInverse);
                position.copy(scope.target).add(offset);
                scope.object.lookAt(scope.target);
                if (scope.enableDamping === true) {
                    sphericalDelta.theta *= 1 - scope.dampingFactor;
                    sphericalDelta.phi *= 1 - scope.dampingFactor;
                    panOffset.multiplyScalar(1 - scope.dampingFactor);
                } else {
                    sphericalDelta.set(0, 0, 0);
                    panOffset.set(0, 0, 0);
                }
                scale = 1;
                if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
                    scope.dispatchEvent(_changeEvent);
                    lastPosition.copy(scope.object.position);
                    lastQuaternion.copy(scope.object.quaternion);
                    zoomChanged = false;
                    return true;
                }
                return false;
            };
        }();
        this.dispose = function() {
            scope.domElement.removeEventListener('contextmenu', onContextMenu);
            scope.domElement.removeEventListener('pointerdown', onPointerDown);
            scope.domElement.removeEventListener('pointercancel', onPointerUp);
            scope.domElement.removeEventListener('wheel', onMouseWheel);
            scope.domElement.removeEventListener('pointermove', onPointerMove);
            scope.domElement.removeEventListener('pointerup', onPointerUp);
            if (scope._domElementKeyEvents !== null) {
                scope._domElementKeyEvents.removeEventListener('keydown', onKeyDown);
                scope._domElementKeyEvents = null;
            }
        };
        const scope = this;
        const STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };
        let state = STATE.NONE;
        const EPS = 0.000001;
        const spherical = new Spherical();
        const sphericalDelta = new Spherical();
        let scale = 1;
        const panOffset = new Vector3();
        let zoomChanged = false;
        const rotateStart = new Vector2();
        const rotateEnd = new Vector2();
        const rotateDelta = new Vector2();
        const panStart = new Vector2();
        const panEnd = new Vector2();
        const panDelta = new Vector2();
        const dollyStart = new Vector2();
        const dollyEnd = new Vector2();
        const dollyDelta = new Vector2();
        const pointers = [];
        const pointerPositions = {};
        function getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
        }
        function getZoomScale() {
            return Math.pow(0.95, scope.zoomSpeed);
        }
        function rotateLeft(angle) {
            sphericalDelta.theta -= angle;
        }
        function rotateUp(angle) {
            sphericalDelta.phi -= angle;
        }
        const panLeft = function() {
            const v = new Vector3();
            return function panLeft(distance, objectMatrix) {
                v.setFromMatrixColumn(objectMatrix, 0);
                v.multiplyScalar(-distance);
                panOffset.add(v);
            };
        }();
        const panUp = function() {
            const v = new Vector3();
            return function panUp(distance, objectMatrix) {
                if (scope.screenSpacePanning === true) {
                    v.setFromMatrixColumn(objectMatrix, 1);
                } else {
                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(scope.object.up, v);
                }
                v.multiplyScalar(distance);
                panOffset.add(v);
            };
        }();
        const pan = function() {
            const offset = new Vector3();
            return function pan(deltaX, deltaY) {
                const element = scope.domElement;
                if (scope.object.isPerspectiveCamera) {
                    const position = scope.object.position;
                    offset.copy(position).sub(scope.target);
                    let targetDistance = offset.length();
                    targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
                } else if (scope.object.isOrthographicCamera) {
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
                } else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    scope.enablePan = false;
                }
            };
        }();
        function dollyOut(dollyScale) {
            if (scope.object.isPerspectiveCamera) {
                scale /= dollyScale;
            } else if (scope.object.isOrthographicCamera) {
                scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
                scope.object.updateProjectionMatrix();
                zoomChanged = true;
            } else {
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;
            }
        }
        function dollyIn(dollyScale) {
            if (scope.object.isPerspectiveCamera) {
                scale *= dollyScale;
            } else if (scope.object.isOrthographicCamera) {
                scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
                scope.object.updateProjectionMatrix();
                zoomChanged = true;
            } else {
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;
            }
        }
        function handleMouseDownRotate(event) {
            rotateStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownDolly(event) {
            dollyStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownPan(event) {
            panStart.set(event.clientX, event.clientY);
        }
        function handleMouseMoveRotate(event) {
            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            const element = scope.domElement;
            rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
            rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            rotateStart.copy(rotateEnd);
            scope.update();
        }
        function handleMouseMoveDolly(event) {
            dollyEnd.set(event.clientX, event.clientY);
            dollyDelta.subVectors(dollyEnd, dollyStart);
            if (dollyDelta.y > 0) {
                dollyOut(getZoomScale());
            } else if (dollyDelta.y < 0) {
                dollyIn(getZoomScale());
            }
            dollyStart.copy(dollyEnd);
            scope.update();
        }
        function handleMouseMovePan(event) {
            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
            scope.update();
        }
        function handleMouseWheel(event) {
            if (event.deltaY < 0) {
                dollyIn(getZoomScale());
            } else if (event.deltaY > 0) {
                dollyOut(getZoomScale());
            }
            scope.update();
        }
        function handleKeyDown(event) {
            let needsUpdate = false;
            switch(event.code){
                case scope.keys.UP:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        rotateUp(2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight);
                    } else {
                        pan(0, scope.keyPanSpeed);
                    }
                    needsUpdate = true;
                    break;
                case scope.keys.BOTTOM:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        rotateUp(-2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight);
                    } else {
                        pan(0, -scope.keyPanSpeed);
                    }
                    needsUpdate = true;
                    break;
                case scope.keys.LEFT:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        rotateLeft(2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight);
                    } else {
                        pan(scope.keyPanSpeed, 0);
                    }
                    needsUpdate = true;
                    break;
                case scope.keys.RIGHT:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        rotateLeft(-2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight);
                    } else {
                        pan(-scope.keyPanSpeed, 0);
                    }
                    needsUpdate = true;
                    break;
            }
            if (needsUpdate) {
                event.preventDefault();
                scope.update();
            }
        }
        function handleTouchStartRotate() {
            if (pointers.length === 1) {
                rotateStart.set(pointers[0].pageX, pointers[0].pageY);
            } else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                rotateStart.set(x, y);
            }
        }
        function handleTouchStartPan() {
            if (pointers.length === 1) {
                panStart.set(pointers[0].pageX, pointers[0].pageY);
            } else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                panStart.set(x, y);
            }
        }
        function handleTouchStartDolly() {
            const dx = pointers[0].pageX - pointers[1].pageX;
            const dy = pointers[0].pageY - pointers[1].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyStart.set(0, distance);
        }
        function handleTouchStartDollyPan() {
            if (scope.enableZoom) handleTouchStartDolly();
            if (scope.enablePan) handleTouchStartPan();
        }
        function handleTouchStartDollyRotate() {
            if (scope.enableZoom) handleTouchStartDolly();
            if (scope.enableRotate) handleTouchStartRotate();
        }
        function handleTouchMoveRotate(event) {
            if (pointers.length == 1) {
                rotateEnd.set(event.pageX, event.pageY);
            } else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                rotateEnd.set(x, y);
            }
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            const element = scope.domElement;
            rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
            rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            rotateStart.copy(rotateEnd);
        }
        function handleTouchMovePan(event) {
            if (pointers.length === 1) {
                panEnd.set(event.pageX, event.pageY);
            } else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                panEnd.set(x, y);
            }
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
        }
        function handleTouchMoveDolly(event) {
            const position = getSecondPointerPosition(event);
            const dx = event.pageX - position.x;
            const dy = event.pageY - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyEnd.set(0, distance);
            dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
            dollyOut(dollyDelta.y);
            dollyStart.copy(dollyEnd);
        }
        function handleTouchMoveDollyPan(event) {
            if (scope.enableZoom) handleTouchMoveDolly(event);
            if (scope.enablePan) handleTouchMovePan(event);
        }
        function handleTouchMoveDollyRotate(event) {
            if (scope.enableZoom) handleTouchMoveDolly(event);
            if (scope.enableRotate) handleTouchMoveRotate(event);
        }
        function onPointerDown(event) {
            if (scope.enabled === false) return;
            if (pointers.length === 0) {
                scope.domElement.setPointerCapture(event.pointerId);
                scope.domElement.addEventListener('pointermove', onPointerMove);
                scope.domElement.addEventListener('pointerup', onPointerUp);
            }
            addPointer(event);
            if (event.pointerType === 'touch') {
                onTouchStart(event);
            } else {
                onMouseDown(event);
            }
        }
        function onPointerMove(event) {
            if (scope.enabled === false) return;
            if (event.pointerType === 'touch') {
                onTouchMove(event);
            } else {
                onMouseMove(event);
            }
        }
        function onPointerUp(event) {
            removePointer(event);
            if (pointers.length === 0) {
                scope.domElement.releasePointerCapture(event.pointerId);
                scope.domElement.removeEventListener('pointermove', onPointerMove);
                scope.domElement.removeEventListener('pointerup', onPointerUp);
            }
            scope.dispatchEvent(_endEvent);
            state = STATE.NONE;
        }
        function onMouseDown(event) {
            let mouseAction;
            switch(event.button){
                case 0:
                    mouseAction = scope.mouseButtons.LEFT;
                    break;
                case 1:
                    mouseAction = scope.mouseButtons.MIDDLE;
                    break;
                case 2:
                    mouseAction = scope.mouseButtons.RIGHT;
                    break;
                default:
                    mouseAction = -1;
            }
            switch(mouseAction){
                case MOUSE.DOLLY:
                    if (scope.enableZoom === false) return;
                    handleMouseDownDolly(event);
                    state = STATE.DOLLY;
                    break;
                case MOUSE.ROTATE:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    } else {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    }
                    break;
                case MOUSE.PAN:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    } else {
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                scope.dispatchEvent(_startEvent);
            }
        }
        function onMouseMove(event) {
            switch(state){
                case STATE.ROTATE:
                    if (scope.enableRotate === false) return;
                    handleMouseMoveRotate(event);
                    break;
                case STATE.DOLLY:
                    if (scope.enableZoom === false) return;
                    handleMouseMoveDolly(event);
                    break;
                case STATE.PAN:
                    if (scope.enablePan === false) return;
                    handleMouseMovePan(event);
                    break;
            }
        }
        function onMouseWheel(event) {
            if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE) return;
            event.preventDefault();
            scope.dispatchEvent(_startEvent);
            handleMouseWheel(event);
            scope.dispatchEvent(_endEvent);
        }
        function onKeyDown(event) {
            if (scope.enabled === false || scope.enablePan === false) return;
            handleKeyDown(event);
        }
        function onTouchStart(event) {
            trackPointer(event);
            switch(pointers.length){
                case 1:
                    switch(scope.touches.ONE){
                        case TOUCH.ROTATE:
                            if (scope.enableRotate === false) return;
                            handleTouchStartRotate();
                            state = STATE.TOUCH_ROTATE;
                            break;
                        case TOUCH.PAN:
                            if (scope.enablePan === false) return;
                            handleTouchStartPan();
                            state = STATE.TOUCH_PAN;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                case 2:
                    switch(scope.touches.TWO){
                        case TOUCH.DOLLY_PAN:
                            if (scope.enableZoom === false && scope.enablePan === false) return;
                            handleTouchStartDollyPan();
                            state = STATE.TOUCH_DOLLY_PAN;
                            break;
                        case TOUCH.DOLLY_ROTATE:
                            if (scope.enableZoom === false && scope.enableRotate === false) return;
                            handleTouchStartDollyRotate();
                            state = STATE.TOUCH_DOLLY_ROTATE;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                scope.dispatchEvent(_startEvent);
            }
        }
        function onTouchMove(event) {
            trackPointer(event);
            switch(state){
                case STATE.TOUCH_ROTATE:
                    if (scope.enableRotate === false) return;
                    handleTouchMoveRotate(event);
                    scope.update();
                    break;
                case STATE.TOUCH_PAN:
                    if (scope.enablePan === false) return;
                    handleTouchMovePan(event);
                    scope.update();
                    break;
                case STATE.TOUCH_DOLLY_PAN:
                    if (scope.enableZoom === false && scope.enablePan === false) return;
                    handleTouchMoveDollyPan(event);
                    scope.update();
                    break;
                case STATE.TOUCH_DOLLY_ROTATE:
                    if (scope.enableZoom === false && scope.enableRotate === false) return;
                    handleTouchMoveDollyRotate(event);
                    scope.update();
                    break;
                default:
                    state = STATE.NONE;
            }
        }
        function onContextMenu(event) {
            if (scope.enabled === false) return;
            event.preventDefault();
        }
        function addPointer(event) {
            pointers.push(event);
        }
        function removePointer(event) {
            delete pointerPositions[event.pointerId];
            for(let i = 0; i < pointers.length; i++){
                if (pointers[i].pointerId == event.pointerId) {
                    pointers.splice(i, 1);
                    return;
                }
            }
        }
        function trackPointer(event) {
            let position = pointerPositions[event.pointerId];
            if (position === undefined) {
                position = new Vector2();
                pointerPositions[event.pointerId] = position;
            }
            position.set(event.pageX, event.pageY);
        }
        function getSecondPointerPosition(event) {
            const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
            return pointerPositions[pointer.pointerId];
        }
        scope.domElement.addEventListener('contextmenu', onContextMenu);
        scope.domElement.addEventListener('pointerdown', onPointerDown);
        scope.domElement.addEventListener('pointercancel', onPointerUp);
        scope.domElement.addEventListener('wheel', onMouseWheel, {
            passive: false
        });
        this.update();
    }
}
let geometries = [];
let scene = null;
let renderer = null;
let camera = null;
let controls = null;
function setup(container, width, height) {
    renderer = new WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor("#000000");
    container.appendChild(renderer.domElement);
    camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;
    var ambientLight = new AmbientLight(0xcccccc, 0.4);
    var pointLight = new PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene = new Scene();
    scene.add(ambientLight);
    scene.add(camera);
}
function addRepresentation(r) {
    let geo = renderRepresentation(r);
    geo.children.forEach((c)=>scene.add(c));
    geometries.push(geo);
}
function updateRepresentation(i, r) {
    let old_geo = geometries[i];
    let new_geo = renderRepresentation(r);
    old_geo.children.forEach((c)=>{
        scene.remove(c);
        c.geometry.dispose();
        c.material.dispose();
    });
    new_geo.children.forEach((c)=>scene.add(c));
    geometries[i] = new_geo;
}
function renderRepresentation(representation) {
    let geometry = {
        children: []
    };
    for(let i = 0; i < representation.primitives.length; ++i){
        let material = new MeshPhongMaterial({
            color: parseInt(representation.colors[i])
        });
        let p = representation.primitives[i];
        if ('center' in p && 'r' in p) {
            let sphere_geometry = new SphereGeometry(p.r, 32, 32);
            let sphere = new Mesh(sphere_geometry, material);
            sphere.position.set(p.center[0], p.center[1], p.center[2]);
            geometry.children.push(sphere);
        } else if ('origin' in p && 'extremity' in p && 'r' in p) {
            let cylinder = createCylinder(p.origin, p.extremity, p.r);
            geometry.children.push(new Mesh(cylinder, material));
        }
    }
    return geometry;
}
function createCylinder(s_i, m_i, r) {
    let s = new Vector3(s_i[0], s_i[1], s_i[2]);
    let m = new Vector3(m_i[0], m_i[1], m_i[2]);
    const cylinder = new CylinderGeometry(r, r, s.distanceTo(m), 32, 2);
    const { x: ax , y: ay , z: az  } = s;
    const { x: bx , y: by , z: bz  } = m;
    const stickAxis = new Vector3(bx - ax, by - ay, bz - az).normalize();
    const quaternion = new Quaternion();
    const cylinderUpAxis = new Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis);
    cylinder.applyQuaternion(quaternion);
    cylinder.translate((bx + ax) / 2, (by + ay) / 2, (bz + az) / 2);
    return cylinder;
}
function setupControls(focus_point) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 0;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target = new Vector3(focus_point[0], focus_point[1], focus_point[2]);
    controls.addEventListener('change', render);
}
function render() {
    renderer.render(scene, camera);
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}
export { setup as setup, setupControls as setupControls, animate as animate, render as render, addRepresentation as addRepresentation, updateRepresentation as updateRepresentation, renderer as renderer, camera as camera, scene as scene, geometries as geometries, controls as controls };

