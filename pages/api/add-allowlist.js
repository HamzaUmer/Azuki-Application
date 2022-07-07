import {table} from '../../utils/airtable'

export default async function handler(req,res) {
    const {address} = JSON.parse(req.body)

    try {
        await table.create ([
            {
                fields: {
                    Address: address,
                },
            },
        ])

        res.status(200).json({
            success: true,
            message: 'User added to allowList!!'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}