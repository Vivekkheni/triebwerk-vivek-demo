module.exports = {
    apiResponse: async (status, message, data, error) => {
        return {
            status,
            message,
            data: data,
            error: error
        }
    },
    Status: {
        user: {
            available: "available", assign: "assign"
        },
        report: {
            pending: "pending", assign: "assign", completed: "completed"
        }
    }
}