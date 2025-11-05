import React from "react"
import { Pagination, Form, Row, Col } from "react-bootstrap"

export default function CustomerPagination({
    currentPage,
    totalPages,
    setCurrentPage
}) {
    if (totalPages === 0) return null

    return (
        <Row className="align-items-center mb-2">

            {/* Pagination */}
            <Pagination className="justify-content-center mt-3">
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </Row>
    )
}
