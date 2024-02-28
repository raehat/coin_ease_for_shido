package com.example.particleapp.data

import kotlinx.serialization.Serializable

@Serializable
data class PlacedOrderItem(
    val __v: Int,
    val _id: String,
    val fiatAmountAsked: Int,
    val orderCompleted: Boolean,
    val orderId: Int,
    val tokenProviderBankDetails: TokenProviderBankDetails,
    val tokenProviderEmail: String,
    val tokenProviderName: String
)