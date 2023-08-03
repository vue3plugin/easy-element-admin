import type { App } from "vue"
import { installMyComponent } from "./mycomponent"
import "virtual:svg-icons-register" // svg

export function setup(app: App) {
    installMyComponent(app)
} 