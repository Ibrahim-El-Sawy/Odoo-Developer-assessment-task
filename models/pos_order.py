from odoo import models, fields, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    # The field to store tags in the backend
    tag_ids = fields.Many2many('pos.order.tag', string='Order Tags')

    @api.model
    def _order_fields(self, ui_order):
        """
        Map the JSON data coming from POS Frontend to the Backend fields.
        """
        res = super(PosOrder, self)._order_fields(ui_order)
        if 'selected_tag_ids' in ui_order:
            res['tag_ids'] = [(6, 0, ui_order['selected_tag_ids'])]
        return res