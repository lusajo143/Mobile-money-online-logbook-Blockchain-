'use strict';

/**
 * A Smart contract to implement Mobile Money Online Logbook
 * 
 * This smart constract does the following as per requirement:
 * ** Adds transactions to the ledger
 * ** Gets transactions done by the specified user
 * ** Gets transactions done by agent
 * 
 */

const { Contract } = require('fabric-contract-api');

class pesa extends Contract {
    
    async InitLedger (ctx){
        const data = {
            From: 'Initial',
            To: 'Initial',
            Amount: 0,
            Agent: 'Initial',
            Type: 'Inital',
            Time: new Date().getTime()
        }

        await ctx.stub.putState(new Date().getTime(),Buffer.from(JSON.stringify(data)));

        console.log("Successfully created a initial transaction...");

    }

    // Adding a transaction
    async AddTransaction(ctx, from, to, amount, agent, type) {
        const data = {
            From: from,
            To: to,
            Amount: amount,
            Agent: agent,
            Type: type,
            Time: new Date().getTime()
        }

        await ctx.stub.putState(from, Buffer.from(JSON.stringify(data)));

        console.log("Successfully added a transaction...");

    }

    // Get user transactions
    async getUserTransaction(ctx, from) {

        const data = await ctx.stub.getState(from);

        if (!data || data.length === 0) {
            throw new Error("Failed to get transactions...");
        }

        return data.toString();
    }

    // Update delivery
    async updateDelivery(ctx, from, to, agent) {
        
    }

}

module.exports = pesa;