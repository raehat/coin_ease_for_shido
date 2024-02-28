package com.example.particleapp.data

import kotlinx.serialization.Serializable

@Serializable
data class TokenProviderBankDetails(
    val ifsc: String,
    val name: String
)