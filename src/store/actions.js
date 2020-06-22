import * as type from './type';

// this.$store.dispatch({
//     type: type.CONSTANT,
//     payload: {}
// })

export default {
    [type.CONSTANT](context, payload) {
        context.commit(type.CONSTANT);
    }
}