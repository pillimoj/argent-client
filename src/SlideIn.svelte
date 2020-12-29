<div class="outer">
    <div class="inner">
        <slot />
    </div>
</div>

<style>
    .outer {
        overflow-y: hidden;
    }
    .inner {
        position: relative;
        animation: 1000ms linear 0s 1 normal both running scale-easeOutBounce;
    }
    @keyframes scale-easeOutBounce {
        0% {
            transform: translate(0, -100%);
        }

        12% {
            transform: translate(0, -89%);
        }

        24% {
            transform: translate(0, -56%);
        }

        36% {
            transform: translate(0, -2%);
        }

        54% {
            transform: translate(0, -25%);
        }

        74% {
            transform: translate(0, -2%);
        }

        82% {
            transform: translate(0, -6%);
        }

        92% {
            transform: translate(0, -1%);
        }

        96% {
            transform: translate(0, -2%);
        }

        100% {
            transform: translate(0, 0%);
        }
    }
</style>
