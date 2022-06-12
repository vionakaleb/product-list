import React from "react"
import { Row, Col, CardBody, Card, CardTitle } from "reactstrap"

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
  
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Frontend Dashboard</li>
                </ol>
              </div>

            </div>
          </div>
        </Row>

        <Row>
          <Col lg={6}>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">
                      <h2>Welcome, Test User.</h2>
                      <h3>You are logging in as Test User.</h3>
                    </CardTitle>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Dashboard