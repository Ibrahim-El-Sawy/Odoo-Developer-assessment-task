POS Order Tag Management (Odoo v17)
Overview

This module extends the Odoo v17 Point of Sale to allow cashiers to assign specific tags to orders. These tags help in categorizing orders (e.g., "VIP", "Delivery", "Urgent") and are synced directly to the backend for reporting and analysis.
Features

    Backend Tag Management: Create and color-code tags from Point of Sale -> Configuration -> Order Tags.

    POS UI Integration: A new button in the Product Screen to select a tag for the current order.

    Mandatory Validation: Prevents the cashier from validating/finishing the payment if no tag is selected (Guarantees data integrity).

    Backend Sync: Selected tags are stored in the pos.order model using a Many2many relationship.

    Real-time Logic: Built using OWL (Odoo Web Library) and JS Patches.

Technical Implementation Details
1. Backend (Python)

    Model pos.order.tag: A simple model to store tag names and colors.

    Model pos.order Inherit:

        Added tag_ids field.

        Overrode _order_fields to map the selected_tag_id coming from the POS UI (JSON) to the backend recordset.

2. Frontend (Javascript/OWL)

    Patch Order.prototype: Extended the order model to include selected_tag_id and ensured it persists in the export_as_JSON method.

    Component TagButton:

        A custom component injected into the ProductScreen.

        Uses onWillStart to fetch available tags via ORM service.

        Updates the current order state when a tag is selected.

    Patch PaymentScreen.prototype:

        Intercepts the validateOrder method.

        Added logic to check if order.selected_tag_id exists. If not, it triggers a system notification and blocks the validation.

Installation

    Copy the module folder pos_order_tag_v17 to your Odoo addons directory.

    Restart your Odoo server.

    Enable Developer Mode.

    Go to Apps -> Click Update Apps List.

    Search for "POS Order Tag" and click Activate.

How to Use

    Define Tags: Go to Point of Sale > Configuration > Order Tags and create tags like "Dine-in", "Takeaway".

    Open POS: Start a new session.

    Select Tag: Before proceeding to payment, click the Tag Button (located near the customer note button) and select a tag.

    Validation: If you try to pay without selecting a tag, a red danger notification will appear: "Please select an Order Tag before validating the order".

    Backend Check: Once the order is closed, go to Point of Sale > Orders to see the assigned tags in the order details.
