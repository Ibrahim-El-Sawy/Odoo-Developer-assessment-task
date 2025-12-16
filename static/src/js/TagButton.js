/** @odoo-module */
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { TagPopup } from "./TagPopup";

export class TagButton extends Component {
    static template = "pos_order_tag_v17.TagButton";

    setup() {
        this.pos = useService("pos");
        this.popup = useService("popup");
    }

    async onClick() {
        const order = this.pos.get_order();
        const { confirmed, payload } = await this.popup.add(TagPopup, {
            title: "Select Order Tags",
            tags: this.pos.tags,
            selectedIds: order.get_tags()
        });

        if (confirmed) {
            order.set_tags(payload);
        }
    }
}

ProductScreen.addControlButton({
    component: TagButton,
    position: ["before", "OrderlineCustomerNoteButton"],
});