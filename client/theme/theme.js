const first = {
    main: "#095A6F",
    button: "#FFC000"
};

const tmpSecond = {
    main: "red"
};
const second = {};

Object.assign(second, first, tmpSecond);
export default {
    first: first,
    second: second
}
