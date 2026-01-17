/** @odoo-module */
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { Order } from "@point_of_sale/app/store/models";
import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {
    setup() {
        super.setup(...arguments);
        this.selected_tag_id = this.selected_tag_id || null;
    },
    export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        json.selected_tag_id = this.selected_tag_id;
        console.log("inside json",json)
        return json;
    },
});

export class TagButton extends Component {
    static template = "pos_order_tag_v17.TagButton";

    setup() {
        this.pos = useService("pos");
        this.orm = useService("orm");
        this.state = useState({ tags: [] });
        this.onWillStart();
    }

    async onWillStart() {
        this.state.tags = await this.orm.searchRead("pos.order.tag", [], ["id", "name"]);
    }

    onTagChange(ev) {
        const tagId = parseInt(ev.target.value);
        console.log("get order method 1:" , this.pos.get_order())
        this.pos.get_order().selected_tag_id = tagId;
        this.pos.get_order().ddddd = tagId;

        console.log("get order method 2:" , this.pos.get_order())

        console.log("Tag Selected and Saved to Order:", tagId);
    }
}

patch(PaymentScreen.prototype, {
    async validateOrder(isForceValidate) {
        const order = this.pos.get_order();

        // التأكد إن المستخدم اختار Tag
        if (order.selected_tag_id) {
            console.log("التاق موجود، سيتم إرساله للسيرفر ضمن بيانات الأوردر:", order.selected_tag_id);
            
            return super.validateOrder(...arguments);
        } else {
            this.env.services.notification.add("الرجاء اختيار وسم (Tag) قبل تأكيد الطلب", {
                type: "danger",
            });
            return;
        }
    }
});
ProductScreen.addControlButton({
    component: TagButton,
    position: ["before", "OrderlineCustomerNoteButton"],
});