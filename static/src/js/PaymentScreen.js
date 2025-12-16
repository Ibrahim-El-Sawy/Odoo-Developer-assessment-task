/** @odoo-module */
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { patch } from "@web/core/utils/patch";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";

patch(PaymentScreen.prototype, {
    async validateOrder(isForceValidate) {
        const order = this.pos.get_order();
        const tags = order.get_tags();

        if (!tags || tags.length === 0) {
            await this.popup.add(ErrorPopup, {
                title: "Validation Error",
                body: "Please select at least one Order Tag before proceeding.",
            });
            return;
        }

        await super.validateOrder(...arguments);
    }
});