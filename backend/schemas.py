from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class RequestExplanation(BaseModel):
    reason: str

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: str
    total_orders: int
    total_returns: int
    avg_return_time_days: float
    risk_score: float
    is_fraud: bool
    reasons: Optional[List[str]] = []

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_users_analyzed: int
    high_risk_users: int
    suspicious_returns: int
    average_risk_score: float

class UploadResponse(BaseModel):
    message: str
    rows_processed: int
