import { Application, Controller } from "https://cdn.jsdelivr.net/npm/stimulus@2.0.0/+esm";

const Stimulus = new Application(document.documentElement, {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-ref"
});

Controller.prototype.getTarget = function(target) {
    return this.targets.find(target)
};

Stimulus.start();

Stimulus.register("lib-drawer", class extends Controller {
    connect() {
        setTimeout(() => this.getTarget("nav").classList.add("is-transition"), 50);
        this.getTarget("nav").addEventListener("click", (e) => {
            if (e.target === this.getTarget("nav")) {
                this.hide();
            }
        })
    }

    show(e) {
        this.getTarget("nav").scrollLeft = 0;
        this.getTarget("nav").style.setProperty('--drawerOpacity', `1`);
        this.getTarget("nav").classList.add("is-opacity", "state-active");
        document.documentElement.classList.add("drawer-active");

        setTimeout(() => {
            this.getTarget("nav").scrollLeft = 0;
        }, 100)
    }

    hide() {
        this.getTarget("nav").classList.remove("state-active");
        this.getTarget("nav").classList.add("is-opacity");
        this.getTarget("nav").style.setProperty('--drawerOpacity', `0`);
        document.documentElement.classList.remove("drawer-active");
    }

    scroll(e) {
        console.log(e.target.scrollLeft)
        // if (e.target.scrollLeft > 1) {
        //     this.getTarget("nav").classList.remove("is-opacity");
        //     this.getTarget("nav").style.setProperty('--drawerOpacity', `${Math.abs((e.target.scrollLeft / this.getTarget("nav").children[0].clientWidth) - 1)}`);
        // }
        //
        // if (e.target.scrollLeft === this.getTarget("nav").children[0].clientWidth) {
        //     this.getTarget("nav").classList.remove("state-active");
        //     document.documentElement.classList.remove("drawer-active");
        // }
    }
});
