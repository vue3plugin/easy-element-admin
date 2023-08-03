import type { App } from "vue";
import thCard from "@/components/card/thCard.vue"
import ThLoading from "@/components/loading/Index.vue"

export function installMyComponent(app: App) {
    app.component("thCard", thCard)
    app.component("ThLoading", ThLoading)
}