from odoo import models, fields, api
class PosOrder(models.Model):
    _inherit = 'pos.order'
    tag_ids = fields.Many2many('pos.order.tag', string="Order Tags")

    @api.model
    def _order_fields(self, ui_order):
        print('*********_order_fields inside********')
        res = super(PosOrder, self)._order_fields(ui_order)
        if ui_order.get('selected_tag_id'):
            res['tag_ids'] = [(4, ui_order['selected_tag_id'])]
        return res 