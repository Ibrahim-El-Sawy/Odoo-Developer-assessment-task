/** @odoo-module */
import { PosStore } from "@point_of_sale/app/store/pos_store";
import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

// 1. Load Tags into POS
patch(PosStore.prototype, {
    async _processData(loadedData) {
        await super._processData(...arguments);
        this.tags = await this.orm.searchRead("pos.order.tag", [], ["id", "name", "color"]);
    }
});

// 2. Extend Order to store selected tags
patch(Order.prototype, {
    setup() {
        super.setup(...arguments);
        this.tag_ids = this.tag_ids || [];
    },
    export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        json.tag_ids = this.tag_ids;
        return json;
    },
    init_from_JSON(json) {
        super.init_from_JSON(...arguments);
        this.tag_ids = json.tag_ids || [];
    },
    set_tags(tags) {
        this.tag_ids = tags;
    },
    get_tags() {
        return this.tag_ids;
    }
});