from odoo import http
from odoo.http import request

class PosOrderTagAPI(http.Controller):

    @http.route('/api/pos/order-tags', type='json', auth='public', methods=['POST'], csrf=False)
    def create_order_tag(self, **payload):
        tag_name = payload.get('tag')
        color = payload.get('color', 0)

        if not tag_name:
            return {'status': 'error', 'message': 'Tag name is required'}

        tag = request.env['pos.order.tag'].sudo().create({
            'name': tag_name,
            'color': color
        })

        return {'status': 'success', 'id': tag.id, 'name': tag.name}
