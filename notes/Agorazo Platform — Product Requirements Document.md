# AGORAZO PLATFORM

## Product Requirements Document

**Product Name:** Agorazo  
**Tagline:** Buy. Sell. Drive.  
**Product Type:** Automotive Marketplace and Vehicle Transaction Platform  
**Primary Launch Market:** Ghana  
**Initial Vehicle Supply Market:** China  
**Initial Business Model:** Agorazo-owned/direct listings  
**Future Business Model:** Multi-dealer marketplace  
**Escrow:** Not included in MVP  
**Primary Payment Channels:** Mobile Money, bank transfer and supported online payments through licensed PSP integrations

---

# 1. Product Vision

Agorazo is a digital automotive marketplace designed to manage more than vehicle listings.

The platform should allow buyers to discover vehicles, understand pricing, choose service packages, make staged payments, track their vehicle transaction, request clearing, request registration and manage documents.

Agorazo will initially sell vehicles supplied by its own China-based vehicle supplier.

The supplier provides Agorazo with a price that includes:

- Vehicle
- China-side processing
- Export
- Shipping to Tema Port

Agorazo applies configurable vehicle markups and lists the vehicles for customers in Ghana.

Customers may choose to:

1. Purchase the vehicle and clear it themselves.
2. Purchase the vehicle and allow Agorazo to coordinate clearance.
3. Add DVLA registration.
4. Add insurance.
5. Add delivery.
6. Pay according to approved staged-payment arrangements.

The platform will later allow verified dealerships and automotive businesses to create accounts and sell their own vehicles.

---

# 2. Product Objective

Agorazo should become the operating infrastructure connecting:

- Vehicle buyers
- Agorazo
- Vehicle dealers
- International vehicle suppliers
- Clearing agents
- DVLA processing operations
- Insurance partners
- Delivery partners
- Banks and finance companies

The customer experience should move from:

**Finding a vehicle**

to

**Receiving a road-ready vehicle**

within one digital environment.

---

# 3. Product Principles

Agorazo should be designed around five principles.

### Transparency

Customers should understand:

- Vehicle price
- Included services
- Excluded services
- Estimated government charges
- Agorazo service charges
- Amount paid
- Amount outstanding
- Transaction status

### Trust

The platform should provide:

- Seller verification
- Transaction-based reviews
- Vehicle information
- Document management
- Audit trails
- Dispute handling

### Flexibility

Customers can choose:

- Port-only purchase
- Clearing
- DVLA
- Insurance
- Delivery
- Different allowed payment structures

### Marketplace Scalability

Although Agorazo will initially be the only seller, the system architecture must support multiple sellers from the beginning.

### Regulatory Separation

Agorazo should coordinate transactions while regulated activities remain with appropriate regulated partners.

---

# 4. Product Scope

The platform will contain six major systems.

1. Public automotive marketplace
2. Customer portal
3. Seller/dealer portal
4. Supplier portal
5. Clearing/service-provider portal
6. Agorazo admin platform

The backend must support multi-tenant marketplace operations even during Phase 1 when only Agorazo sells vehicles.

---

# 5. User Roles

## 5.1 Visitor

Can:

- Browse vehicles
- Search
- Filter
- View dealers
- Compare vehicles
- Calculate estimated costs
- View vehicle details
- Request a vehicle
- Register

Cannot:

- Purchase
- Make payments
- Submit reviews
- Access private documents

---

# 5.2 Customer

Can:

- Create profile
- Save vehicles
- Compare cars
- Request quotations
- Purchase vehicles
- Select service packages
- Choose available payment plans
- Make payments
- Track balances
- View transaction milestones
- View shipment status
- Upload documents
- Download documents
- Communicate with seller
- Request support
- Request refunds where eligible
- Rate completed transactions

---

# 5.3 Agorazo Seller Account

Agorazo itself must operate technically as Seller #001.

This prevents the application from having to be restructured when third-party dealers are introduced.

---

# 5.4 Dealer / Seller

Can:

- Register dealership
- Submit verification documents
- Create branches
- Add staff
- Add vehicles
- Configure selling prices
- Configure permitted payment milestones
- Receive leads
- Generate quotations
- Manage orders
- Track payments
- View customers
- Manage documents
- Respond to enquiries
- Manage reviews
- View analytics
- Manage subscription

---

# 5.5 Supplier

Initially this is Agorazo's China supplier.

Can:

- Add or update supplied vehicles
- Enter supplier price
- Upload photos
- Upload vehicle specifications
- Assign VIN
- Upload invoices
- Update availability
- Confirm vehicle allocation
- Update export status
- Update shipping status
- Upload Bill of Lading
- Enter vessel information
- Enter Tema ETA

Suppliers must not see Agorazo's customer-facing margin unless explicitly authorised.

---

# 5.6 Clearing Agent

Can only access transactions assigned to them.

Can:

- View assigned vehicles
- Access required documents
- Enter estimated clearance cost
- Update ICUMS assessment
- Upload tax bill
- Enter actual customs amount
- Update duty-payment status
- Update examination status
- Update vehicle-release status
- Upload clearance documents
- Record agent fees

---

# 5.7 Registration / DVLA Operator

Can:

- View assigned vehicles
- Check documentation
- Update inspection
- Record statutory fees
- Record service charges
- Update registration status
- Record number plate
- Upload registration documents

---

# 5.8 Finance / Accounting User

Can access:

- Transactions
- Payments
- Refunds
- Seller settlements
- Supplier payments
- Agent payments
- Revenue
- Cost
- Margin
- Reconciliation

Cannot necessarily edit vehicle inventory.

---

# 5.9 Customer Support

Can:

- View customer profiles
- View transactions
- View messages
- Open and manage support cases
- Manage disputes
- Initiate refund requests

Cannot complete large refunds without Finance approval.

---

# 5.10 Super Admin

Full platform control.

---

# 6. Marketplace Homepage

The homepage should immediately communicate that Agorazo is more than a classifieds website.

Suggested structure:

### Hero

**Find the Right Car. Buy Your Way.**

Search:

Brand  
Model  
Budget  
Vehicle type

Primary CTAs:

**Browse Cars**

**Request a Car**

---

# 7. Homepage Sections

Recommended sections:

- Featured vehicles
- Vehicles in Ghana
- Vehicles in transit
- Vehicles available from China
- EVs and hybrids
- SUVs
- Sedans
- Pickups
- Verified dealers
- How Agorazo works
- Why buy through Agorazo
- Clearing and registration services
- Customer testimonials
- Request-a-car
- Seller/dealer registration CTA

---

# 8. Vehicle Catalogue

Users must be able to browse and filter vehicles.

Filters:

- Brand
- Model
- Price
- Year
- Fuel type
- Transmission
- Body type
- New/used
- Mileage
- Location
- Seller
- Vehicle status
- EV
- Hybrid
- Engine capacity
- Drive type
- Colour
- Availability

Sorting:

- Newest
- Lowest price
- Highest price
- Most viewed
- Most popular
- Recently reduced

---

# 9. Vehicle Status Types

Each vehicle must belong to one status.

### Available in Ghana

Vehicle physically available locally.

### In Transit

Vehicle already shipped.

### Available in China

Vehicle can be ordered.

### Reserved

Temporarily held.

### Sold

No longer purchasable.

### Custom Order

Vehicle only available through sourcing request.

---

# 10. Vehicle Listing Page

Each listing should show:

- Vehicle name
- Brand
- Model
- Year
- Trim
- Vehicle type
- Fuel type
- Transmission
- Mileage
- Colour
- Engine
- EV battery capacity where applicable
- Range where applicable
- Vehicle condition
- Seller
- Seller verification
- Seller rating
- Availability
- Vehicle location
- Estimated delivery period
- Images
- Videos

---

# 11. Vehicle Pricing Display

Pricing must clearly differentiate between cost levels.

Example:

## Vehicle to Tema

GHS 240,000

Includes:

- Vehicle
- China export
- International shipping
- Tema Port delivery

Does not include:

- Customs duty
- Clearing
- DVLA
- Insurance
- Local delivery

---

# 12. Estimated Road-Ready Price

Where enough information exists, Agorazo may display:

Vehicle to Tema

GHS 240,000

Estimated customs charges

GHS 55,000

Agorazo clearing package

GHS 7,000

DVLA package

GHS 4,500

Delivery

GHS 1,500

### Estimated Road-Ready Price

GHS 308,000

Estimated components must be labelled clearly as estimates.

---

# 13. Add-On Service Selector

Customers should be able to select:

☐ Agorazo Clearing

☐ DVLA Registration

☐ Insurance

☐ Delivery

☐ Inspection

☐ Warranty where available

The total price updates dynamically.

---

# 14. Pricing Engine

The pricing engine is a critical platform component.

It must support multiple levels of markup.

---

# 15. Vehicle Markup

System supports:

### Percentage

Supplier Tema cost:

GHS 200,000

Markup:

10%

Customer price:

GHS 220,000

### Fixed

Supplier Tema cost:

GHS 200,000

Markup:

GHS 25,000

Customer price:

GHS 225,000

---

# 16. Car-Type Markup Rules

Admin must be able to define rules such as:

Sedan

10%

SUV

9%

EV

8%

Pickup

GHS 30,000

Luxury

7%

Commercial

custom

---

# 17. Markup Priority

Pricing must follow:

Vehicle-specific markup

↓

Seller-specific category markup

↓

Platform category rule

↓

Seller default markup

↓

Platform default markup

This gives maximum flexibility.

---

# 18. Clearing Pricing Engine

Clearing must have independent pricing.

Components:

Government customs assessment

Port/local charges

Clearing agent cost

Agorazo clearing service markup

Other approved charges

Customer clearing total

Government charges must not be recorded as Agorazo revenue.

---

# 19. Clearing Markup Rules

Agorazo can configure:

Sedan clearing service

GHS 3,000 markup

SUV

GHS 4,000

Luxury

GHS 7,000

Commercial

GHS 5,000

Rules must be configurable.

---

# 20. DVLA Pricing

DVLA pricing must remain separate.

Components may include:

- Inspection
- Registration
- Number plate
- Other official fees
- Service-provider cost
- Agorazo processing fee

---

# 21. Quote Engine

Customers should be able to request or generate a quote.

Quote example:

**Quote #AGQ-2026-00125**

BYD Song Plus

Vehicle to Tema  
GHS 240,000

Estimated customs  
GHS 55,000

Clearing service  
GHS 7,000

DVLA  
GHS 4,500

Delivery  
GHS 1,500

Estimated total  
GHS 308,000

Valid until:

15 September 2026

Quotes should have expiry dates.

---

# 22. Request-a-Car Feature

Customer submits:

- Brand
- Model
- Year range
- Budget
- Fuel type
- Transmission
- Colour
- Mileage limit
- Condition
- Additional requirements

Request enters sourcing workflow.

Agorazo/supplier can respond with multiple vehicle options.

---

# 23. Request Options

Example:

## Vehicle Option 1

BYD Song Plus

Supplier:

China Supplier A

Tema price:

GHS 230,000

Estimated road-ready:

GHS 295,000

ETA:

8 weeks

Customer can:

**Select**

**Reject**

**Ask Question**

---

# 24. Checkout

Checkout must clearly show:

Seller

Vehicle

Selected services

Vehicle price

Estimated charges

Fixed charges

Total

Payment arrangement

Customer information

Terms acceptance

---

# 25. Payment Types

MVP supports:

### Full Payment

Entire amount due.

### Deposit + Balance

Example:

30% deposit  
70% balance

### Milestone Payment

Example:

30% order

40% shipment

30% final milestone

Seller can define permitted plans subject to platform rules.

---

# 26. Seller Payment Rules

Sellers may create templates.

Example:

**China Import Standard**

30% to confirm

40% before shipment

30% before release

Another seller:

50% deposit

50% before delivery

These must not automatically be described as loans.

---

# 27. Prohibited Seller Payment Structures

Without approved financing partners, sellers should not be allowed to configure arrangements such as:

Vehicle delivered immediately

+

customer owes financed balance for years

+

seller charges interest

These should be reserved for future bank/finance integrations.

---

# 28. Payment Gateway Integration

The platform should have an abstraction layer for PSPs.

Example architecture:

PaymentProvider

- initializePayment()
- verifyPayment()
- createRecipient()
- initiateTransfer()
- initiateRefund()
- getTransaction()
- processWebhook()

Initial providers may include:

Paystack

Hubtel

Additional PSPs can be supported later.

---

# 29. Supported Payment Methods

Depending on PSP approval:

- Mobile Money
- Bank transfer
- Cards
- Other PSP-supported methods

Large vehicle transactions may require bank-based methods due to transaction limits.

---

# 30. Payment Ledger

Agorazo must maintain an internal ledger.

Do not depend only on PSP transaction history.

Each payment records:

payment_id

order_id

customer_id

seller_id

provider

provider_reference

gross_amount

provider_fee

net_amount

currency

payment_method

status

paid_at

---

# 31. Payment Allocation

Each payment may have allocation rows.

Example:

GHS 100,000 received.

Allocation:

Supplier  
GHS 80,000

Seller margin  
GHS 15,000

Platform fee  
GHS 5,000

These allocations do not necessarily mean immediate disbursement.

---

# 32. Allocation vs Disbursement

The system must differentiate:

### Allocated

Money is designated for a purpose.

### Eligible for Disbursement

Milestone conditions are met.

### Disbursed

Money has actually been sent.

This distinction is crucial.

---

# 33. Disbursement Recipients

Potential recipient types:

- Seller
- Supplier
- Clearing company
- Delivery company
- Service provider
- Agorazo
- Customer refund

Recipient methods:

- Bank account
- Mobile Money
- International bank transfer recorded manually/API in future

---

# 34. China Supplier Payments

China supplier payments should not be treated like ordinary Ghana MoMo payouts.

System workflow:

Customer payments recorded

↓

Supplier payable calculated

↓

Operations approves supplier payment

↓

Finance processes payment through bank

↓

Bank reference recorded

↓

Supplier payment marked complete

---

# 35. Payment Milestones

Example vehicle timeline:

Order created

Deposit due

Deposit paid

Vehicle confirmed

Supplier payment authorised

Vehicle allocated

Shipment payment due

Shipment payment paid

Vehicle shipped

Final vehicle balance due

Ghana-service payments due

Vehicle delivered

---

# 36. Payment Dashboard

Customer sees:

Vehicle price

Total package value

Paid

Outstanding

Next payment

Next due date

Payment progress

Transaction history

Download receipt

---

# 37. Refund System

Refund requests must be linked to orders and payments.

Statuses:

Requested

Under Review

Approved

Partially Approved

Rejected

Processing

Completed

Failed

---

# 38. Refund Calculation

System stores:

Customer paid

Supplier amount committed

Supplier amount recoverable

Completed service costs

Eligible refund amount

Refunded amount

Remaining refundable amount

---

# 39. Refund Approval Workflow

Customer/support requests refund.

↓

Operations reviews transaction.

↓

System calculates suggested refundable amount.

↓

Finance reviews.

↓

Authorised approver confirms.

↓

PSP/bank refund initiated.

↓

Customer notified.

---

# 40. Large Refund Controls

Configurable approval thresholds.

Example:

Below GHS 5,000

Finance manager approval

GHS 5,000–50,000

Finance + Operations

Above GHS 50,000

Senior management approval

Thresholds must be configurable.

---

# 41. Orders

Each purchase creates an order.

Order statuses:

Draft

Quote

Awaiting Payment

Partially Paid

Confirmed

Vehicle Allocated

Preparing Export

Shipped

In Transit

Arrived Tema

Clearing

Registration

Ready for Delivery

Delivered

Completed

Cancelled

Refunded

Disputed

---

# 42. Vehicle Journey Timeline

Customer should see a visual timeline.

Example:

Order confirmed ✅

Payment received ✅

Vehicle allocated ✅

VIN confirmed ✅

Export preparation ✅

Shipped ✅

At sea 🟡

Tema arrival

Customs

Vehicle released

Registration

Delivery

---

# 43. Shipment Data

Store:

- Shipping company
- Vessel
- Bill of Lading
- Container/RoRo
- Port of origin
- Port of destination
- Departure date
- ETA
- Actual arrival
- Shipping status
- Tracking URL where available

---

# 44. Document Vault

Order documents can include:

- Quote
- Invoice
- Purchase agreement
- Payment receipt
- Supplier invoice
- Inspection
- VIN documentation
- Bill of Lading
- Shipping documentation
- Customs assessment
- Tax bill
- Clearance documents
- DVLA documents
- Insurance
- Delivery acknowledgement

Permissions must control who can access each document.

---

# 45. Seller Marketplace

Phase 2 introduces external sellers.

Seller registration collects:

- Business name
- Registration number
- TIN where applicable
- Phone
- Email
- Physical address
- Business type
- Directors/representatives
- Settlement information
- Seller documents

---

# 46. Seller Verification Status

Pending

Documents Requested

Under Review

Verified

Rejected

Suspended

Expired / Reverification Required

---

# 47. Verification Badges

Possible badges:

Phone Verified

Identity Verified

Business Verified

Dealer Verified

Vehicle Verified

Premium Seller

Badges must reflect actual verification, not subscription tier alone.

---

# 48. Seller Subscription

Seller account requires an active subscription except promotional/trial periods.

Plan fields:

Plan name

Monthly price

Annual price

Listing limit

Staff limit

Branch limit

Analytics level

Featured listing allowance

Support level

API access

---

# 49. Proposed Plan Structure

### Starter

10 listings

1 staff user

Basic dashboard

Basic leads

### Professional

50 listings

5 users

Payment plans

Analytics

Featured listings

### Premium

Higher/unlimited listings

Multiple branches

Advanced analytics

Bulk uploads

Priority support

### Enterprise

Custom

---

# 50. Subscription Billing

System should support:

Monthly

Annual

Trials

Promotional discounts

Grace periods

Failed renewal handling

Plan upgrade

Plan downgrade

Cancellation

---

# 51. Seller Vehicle Management

Seller can:

Create listing

Save draft

Publish

Pause

Mark sold

Archive

Duplicate listing

Bulk upload

Update price

Update availability

---

# 52. Seller Dashboard

Dashboard metrics:

Active cars

Views

Leads

Quotes

Orders

Cars sold

Revenue

Payments received

Outstanding payments

Upcoming milestones

Average rating

Subscription status

---

# 53. Seller CRM

Seller can manage:

Leads

Customer enquiries

Customers

Notes

Follow-ups

Quotes

Orders

Payment schedules

Messages

---

# 54. Ratings & Reviews

Only verified transaction participants can submit seller reviews.

Review fields:

Overall rating

Vehicle accuracy

Communication

Pricing transparency

Delivery/service

Documentation

Comment

Recommendation

---

# 55. Review Rules

Customer can review only after eligible transaction status.

No anonymous public reviews.

Seller can respond.

Admin can moderate.

Review removal must require policy reason.

---

# 56. Dealer Trust Score

Future feature.

Possible inputs:

Verification

Transaction completion

Average rating

Account age

Response rate

Dispute rate

Cancellation rate

Refund rate

Policy violations

Document accuracy

Trust score should not be purchasable.

---

# 57. Dispute Management

Customer can create dispute.

Categories:

Vehicle differs from listing

Seller unavailable

Payment issue

Delivery delay

Documentation issue

Refund disagreement

Suspected fraud

Service complaint

---

# 58. Dispute Workflow

Open

Evidence Requested

Seller Response

Under Review

Resolution Proposed

Resolved

Appealed

Closed

Admin records outcome and evidence.

---

# 59. Messaging

Agorazo should provide internal messaging between:

Buyer ↔ Seller

Buyer ↔ Agorazo Support

Agorazo ↔ Supplier

Agorazo ↔ Clearing Agent

System should preserve conversation history.

---

# 60. Notifications

Channels:

In-app

Email

SMS

WhatsApp where integrated

Push notifications later

Events:

Payment successful

Payment due

Vehicle allocated

Vehicle shipped

Vehicle arrived

Duty assessment available

Vehicle cleared

Registration completed

Delivery scheduled

Refund update

New enquiry

Seller verification update

---

# 61. Supplier Portal

Supplier dashboard:

Available vehicles

Reserved vehicles

Sold vehicles

Awaiting shipment

In transit

Completed transactions

---

# 62. Supplier Vehicle Fields

Supplier vehicle:

Supplier reference

Brand

Model

Year

Trim

VIN

Colour

Mileage

Fuel

Transmission

Specification

Condition

Supplier price

Shipping included?

Tema price

Availability

Photos

Videos

---

# 63. Supplier Privacy

Supplier sees:

Agorazo orders

Vehicle allocation

Required shipping information

Supplier payable

Supplier payment status

Supplier must not see:

Agorazo vehicle markup

Agorazo clearing margin

Customer final price unless business rules require it

Other suppliers' data

---

# 64. Clearing Portal

Clearing agent sees only assigned vehicles.

Stages:

Documents pending

Pre-arrival preparation

Arrival

Declaration

Valuation

Tax bill

Duty payment

Examination

Release

Terminal release

Collection

Completed

---

# 65. Clearing Cost Fields

Estimated government duty

Actual government duty

Port charge

Agent professional fee

Additional documented cost

Agorazo clearing fee

Total

Supporting documents

---

# 66. DVLA Workflow

Stages:

Awaiting clearance

Documents ready

Inspection booked

Inspection completed

Registration submitted

Registration completed

Plate available

Documents collected

Completed

---

# 67. Admin Dashboard

Executive overview:

GMV

Vehicle sales

Marketplace sales

Revenue

Gross profit

Payments received

Outstanding customer balances

Seller payouts

Supplier payables

Clearing payables

Refund liabilities

Cars sold

Active listings

Active dealers

Customers

Disputes

---

# 68. Admin Pricing Management

Admin can configure:

Global markup

Car-type markup

Individual vehicle markup

Seller-specific rules

Clearing markup

DVLA markup

Delivery markup

Service fees

Transaction fees

Promotional discounts

---

# 69. Fee Types

Platform should support:

Fixed

Percentage

Tiered

Minimum

Maximum

Per transaction

Per vehicle

Per service

Subscription-based

---

# 70. Financial Profitability Dashboard

Per-order example:

Customer total

GHS 320,000

Supplier cost

GHS 220,000

Government charges

GHS 55,000

Agent cost

GHS 5,000

DVLA cost

GHS 3,000

Delivery

GHS 1,500

PSP fees

GHS 2,000

Gross margin

GHS 33,500

---

# 71. Margin Breakdown

Vehicle margin

Clearing margin

DVLA margin

Delivery margin

Platform fee

Other revenue

Allows management to identify profitable services.

---

# 72. Accounting Classification

Every line item should have category:

Government payable

Supplier payable

Seller payable

Service-provider payable

Company revenue

Refund liability

Processing expense

Other expense

---

# 73. Audit Log

Every important action must be recorded.

Examples:

Vehicle price changed

Markup changed

Seller verified

Payment manually updated

Payment allocation changed

Refund approved

Refund rejected

Payout initiated

Document replaced

Role modified

Audit record:

User

Action

Entity

Previous value

New value

Timestamp

IP/device where appropriate

---

# 74. Role-Based Access Control

RBAC must support granular permissions.

Examples:

finance.refunds.approve

finance.payouts.create

vehicles.create

vehicles.publish

seller.verify

clearing.update

dvla.update

users.manage

reports.view

audit.view

---

# 75. Authentication

Recommended:

Email/password

Phone verification

Optional Google sign-in

2FA for seller/admin accounts

Password reset

Session management

Device/session revocation

---

# 76. Security Requirements

Required:

HTTPS

Secure password hashing

JWT/session security

Token expiration

Refresh-token rotation if using JWT

RBAC

Audit logs

Rate limiting

Input validation

File-upload scanning

Secure object storage

Database backups

Encrypted secrets

Webhook signature verification

---

# 77. Payment Security

Agorazo must never store:

Raw card numbers

CVV

Sensitive payment credentials

These remain with PSP.

Webhook verification is mandatory.

---

# 78. Data Model — Core Entities

Recommended entities:

Users

Profiles

Companies

Dealers

DealerBranches

DealerStaff

Suppliers

SupplierUsers

ClearingAgents

ServiceProviders

Vehicles

VehicleModels

VehicleVariants

VehicleCategories

Listings

VehicleImages

VehicleDocuments

VehicleInspections

Quotes

QuoteItems

Orders

OrderItems

OrderServices

PaymentPlans

PaymentMilestones

Payments

PaymentAllocations

Disbursements

Recipients

Refunds

Invoices

Shipments

ShipmentEvents

CustomsClearances

DVLARegistrations

InsurancePolicies

Deliveries

Documents

Reviews

Disputes

Messages

Notifications

Subscriptions

SubscriptionPlans

PricingRules

MarkupRules

ServicePricing

AuditLogs

---

# 79. ID Strategy

Use UUIDs for primary identifiers.

Prefer UUIDv7 if supported by the chosen stack/database.

Examples:

user_id

vehicle_id

order_id

payment_id

dealer_id

---

# 80. Suggested Order Data Relationship

Customer

↓

Order

↓

Vehicle

↓

Seller

↓

Payment Plan

↓

Milestones

↓

Payments

↓

Allocations

↓

Disbursements

↓

Shipment

↓

Clearance

↓

DVLA

↓

Delivery

---

# 81. Recommended API Domains

Possible backend routes:

/auth

/users

/customers

/dealers

/suppliers

/vehicles

/listings

/search

/quotes

/orders

/payments

/payment-plans

/refunds

/disbursements

/pricing

/shipments

/clearance

/dvla

/delivery

/reviews

/disputes

/messages

/notifications

/subscriptions

/admin

/reports

---

# 82. Search

Search should support:

Brand

Model

Dealer

Keyword

Vehicle category

Location

Search engine can initially use PostgreSQL search.

Future:

Elasticsearch / OpenSearch if scale requires it.

---

# 83. Recommended Technology Stack

A suitable architecture is:

### Frontend

React

TypeScript

Tailwind CSS

Modern component library

Responsive web application

---

### Backend

Python FastAPI

REST APIs

Webhooks

Background jobs

---

### Database

PostgreSQL

---

### Cache / Queue

Redis

---

### Object Storage

S3-compatible storage

For:

Vehicle photos

Documents

Invoices

Customs paperwork

---

### Background Jobs

Celery / RQ / equivalent

For:

Notifications

Webhook processing

Payment reconciliation

Report generation

Scheduled payment reminders

---

# 84. Deployment

Recommended environments:

Development

Staging

Production

Separate:

Database

API

Frontend

Object storage

Secrets

Payment credentials

---

# 85. Observability

System should include:

Application logs

Error monitoring

Payment webhook logs

API performance monitoring

Uptime monitoring

Admin security alerts

Audit trails

---

# 86. Analytics

Track product events:

Vehicle Viewed

Vehicle Saved

Compare Added

Quote Requested

Quote Generated

Checkout Started

Payment Started

Payment Completed

Vehicle Reserved

Order Confirmed

Dealer Contacted

Request-a-Car Submitted

---

# 87. Marketplace KPIs

Admin dashboard should measure:

Visitors

Registered customers

Dealer applications

Verified dealers

Vehicle listings

Active listings

Leads

Quotes

Conversion rate

Cars sold

GMV

Revenue

Average transaction value

Average vehicle margin

Subscription MRR

Refund rate

Dispute rate

Customer acquisition cost

---

# 88. Customer Experience Metrics

Track:

Time to first seller response

Time from order to shipment

Time from shipment to Tema

Time from Tema to customs release

Time from clearance to DVLA

Time from DVLA to delivery

Review score

Repeat purchase/referral

---

# 89. MVP Scope

Phase 1 should include only what is required to execute Agorazo's own transactions successfully.

### Public

Homepage

Catalogue

Vehicle pages

Search/filter

Request-a-car

Quote

---

### Customer

Registration

Login

Saved cars

Checkout

Payment

Payment milestones

Orders

Shipment tracking

Documents

Support

---

### Admin

Vehicles

Supplier

Customers

Quotes

Orders

Pricing rules

Markups

Payments

Allocations

Refunds

Shipment

Clearing

DVLA

Documents

Reports

---

# 90. MVP Exclusions

Do not include initially:

Escrow

Individual peer-to-peer sellers

Long-term lending

Native mobile apps

Complex AI recommendation systems

Open insurance marketplace

Multi-country support

Advanced dealer trust algorithm

Crypto payments

Auction system

These can be introduced later.

---

# 91. Phase 2

Add:

Dealer onboarding

Seller verification

Seller subscriptions

Seller inventory

Dealer CRM

Seller payment plans

Payment splitting

Reviews

Dealer ratings

Dealer analytics

Disputes

---

# 92. Phase 3

Add:

More service partners

Insurance integrations

Inspection

Delivery network

Financing applications

Advanced dealer analytics

Dealer API

Bulk listing imports

---

# 93. Phase 4

Add:

True regulated escrow partner

Vehicle financing marketplace

Seller financing integrations

AI car advisor

AI pricing suggestions

Fraud detection

Trust score

Mobile apps

---

# 94. AI Features — Future

### AI Car Advisor

Customer:

“I have GHS 250,000 and want an SUV that's economical.”

AI searches actual Agorazo inventory.

---

### AI Dealer Assistant

Helps sellers:

Generate listings

Respond to leads

Follow up on customers

Summarise sales

---

### AI Fraud/Risk

Flags:

Suspicious seller behaviour

Duplicate listings

Abnormal payment behaviour

Repeated disputes

Potentially manipulated descriptions

---

# 95. Future ICUMS Integration

System should include an abstraction layer for customs integration.

For MVP:

Clearing agent manually updates Agorazo.

Future:

If authorised API access becomes available:

VIN

↓

ICUMS integration

↓

Assessment

↓

Agorazo

Similar integration for clearance status.

---

# 96. Legal Documents Required in Product

Platform should support version-controlled acceptance of:

Terms of Service

Marketplace Terms

Seller Agreement

Purchase Agreement

Import/Sourcing Agreement

Refund Policy

Cancellation Policy

Privacy Policy

Payment Terms

Clearing Terms

Registration Terms

Review Policy

Dispute Policy

---

# 97. Terms Acceptance

Store:

User

Document version

Timestamp

IP

Transaction

This ensures the system can prove what terms applied to a transaction.

---

# 98. Customer Support

Support channels:

Help centre

In-app ticket

Phone

WhatsApp

Email

Ticket fields:

Category

Priority

Order

Seller

Assigned agent

Status

SLA

---

# 99. Admin Moderation

Admin can:

Suspend dealer

Suspend user

Unpublish vehicle

Block listing

Freeze seller publishing

Request reverification

Remove fraudulent review

Close dispute

Restrict payout pending investigation where contractually/legally permitted

---

# 100. Fraud Controls

MVP controls:

Phone verification

Email verification

Seller KYC/business review

Bank-account verification where available

Manual listing moderation for new dealers

VIN field

Duplicate VIN checks

Transaction-based reviews

High-value payment alerts

Refund approval workflow

Audit trail

---

# 101. Acceptance Criteria — Customer Purchase

A customer must be able to:

1. Register.
2. Browse vehicles.
3. Select a vehicle.
4. See included/excluded costs.
5. Add clearing/DVLA services.
6. Choose an available payment plan.
7. Accept terms.
8. Pay through an integrated PSP.
9. Receive payment confirmation.
10. View outstanding balance.
11. Track the vehicle.
12. Access uploaded documents.
13. Receive updates.
14. Complete transaction.
15. Leave review where applicable.

---

# 102. Acceptance Criteria — Seller

A seller must eventually be able to:

1. Register.
2. Submit verification.
3. Subscribe.
4. Add a listing.
5. Configure price.
6. Configure allowed payment options.
7. Receive enquiries.
8. Generate a quote.
9. Receive order.
10. Track payments.
11. Update transaction.
12. View reviews.
13. See analytics.

---

# 103. Acceptance Criteria — Pricing

Admin must be able to:

Create global markup

Create category markup

Create vehicle markup

Override price

Create clearing fees

Create DVLA fees

Set fixed/percentage pricing

View cost vs selling price

View gross profit

---

# 104. Acceptance Criteria — Payments

System must:

Receive PSP webhook

Verify authenticity

Update payment status

Prevent duplicate processing

Allocate money internally

Maintain customer balance

Record payouts

Support refund records

Provide reconciliation report

---

# 105. Non-Functional Requirements

### Performance

Typical pages should load quickly under ordinary Ghana mobile-network conditions.

### Responsive Design

Must work well on:

Mobile

Tablet

Desktop

Mobile experience is especially important.

### Accessibility

Readable text

Keyboard navigation

Clear contrast

Accessible forms

### Reliability

Payment processing must be idempotent.

Critical webhook failures must retry.

### Scalability

Architecture should support thousands of sellers and large vehicle catalogues without redesigning the core data model.

---

# 106. UI Design Direction

Agorazo should feel:

Premium

Modern

Automotive

Trustworthy

Fast

Minimal

Technology-enabled

The selected orange/copper speed emblem can form the basis of the UI identity.

Suggested visual direction:

Dark charcoal

Copper/orange

White/off-white

Neutral greys

Large vehicle photography

Rounded cards

Strong typography

Minimal clutter

---

# 107. Navigation — Customer

Home

Buy Cars

Request a Car

Dealers

How It Works

Services

My Account

---

# 108. Customer Account Navigation

Overview

Saved Cars

Quotes

Orders

Payments

Vehicle Tracking

Documents

Messages

Support

Profile

---

# 109. Seller Navigation

Dashboard

Inventory

Leads

Customers

Quotes

Orders

Payments

Reviews

Analytics

Staff

Branches

Subscription

Settings

---

# 110. Admin Navigation

Dashboard

Vehicles

Listings

Customers

Dealers

Suppliers

Quotes

Orders

Payments

Refunds

Disbursements

Pricing

Shipments

Clearing

DVLA

Services

Subscriptions

Reviews

Disputes

Reports

Audit Logs

Users & Roles

Settings

---

# 111. Product Roadmap Summary

## Launch

Agorazo vehicle sales.

## Expansion

Verified dealerships.

## Platform

Dealer subscriptions and automotive CRM.

## Services

Clearing, DVLA, insurance, delivery.

## Finance

Bank vehicle financing.

## Trust

Advanced verification, ratings and trust scoring.

## Payments

Future regulated escrow option.

## Regional

Expand the marketplace beyond Ghana.

---

# 112. Product Positioning

Agorazo should not be marketed simply as:

“A website for cars.”

It should be positioned as:

> **A trusted automotive transaction marketplace where people can discover vehicles, buy from verified sellers, choose how to pay, track their purchase and access the services required to get the vehicle on the road.**

---

# 113. Final Product Statement

Agorazo's core platform is built around:

**Marketplace**

+

**Payments**

+

**Vehicle Transactions**

+

**Dealer Software**

+

**Vehicle Services**

+

**Trust Infrastructure**

Agorazo begins with its own China-to-Ghana vehicle business but is architected from the first day to become a multi-seller automotive marketplace.

The MVP deliberately avoids escrow and lending complexity.

Instead, it uses:

**licensed payment providers + staged purchase payments + internal payment allocation + controlled disbursement + seller verification + transaction tracking.**

This gives Agorazo a practical path to launch quickly while preserving the architecture required for future dealer expansion, financing integrations and regulated escrow services.

# AGORAZO

## BUY. SELL. DRIVE.