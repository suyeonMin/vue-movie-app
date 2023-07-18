<template>
    <!-- 아래랑 같은 코드. 속성과 값이 동일하면 생략 가능! <div :class="{ absolute, fixed }" class="spinner-border text-primary"></div> -->
    <div :style="{ width: `${size}rem`, height: `${size}rem`, zIndex: zIndex }" 
    :class="{ absolute: absolute, fixed: fixed }" 
    class="spinner-border text-primary"></div>
</template>

<script>
export default{
    props: {
        size: {
            type: Number,
            default: 2
        },
        absolute: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .spinner-border {
        top: 0; bottom: 0; left: 0; right: 0;
        margin: auto;

        &.absolute {
            position: absolute;
        }
        &.fixed {
            position: fixed;
        }
    }
</style>