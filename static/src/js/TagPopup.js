/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { useState } from "@odoo/owl";

export class TagPopup extends AbstractAwaitablePopup {
    static template = "pos_order_tag_v17.TagPopup";

    setup() {
        super.setup();
        this.state = useState({
            selectedIds: new Set(this.props.selectedIds || [])
        });
    }

    toggleTag(tagId) {
        if (this.state.selectedIds.has(tagId)) {
            this.state.selectedIds.delete(tagId);
        } else {
            this.state.selectedIds.add(tagId);
        }
    }

    getPayload() {
        return Array.from(this.state.selectedIds);
    }
}