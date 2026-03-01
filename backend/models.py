from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    total_orders = Column(Integer, default=0)
    total_returns = Column(Integer, default=0)
    avg_return_time_days = Column(Float, default=0.0)
    risk_score = Column(Float, default=0.0)
    is_fraud = Column(Boolean, default=False)
    
    transactions = relationship("Transaction", back_populates="user")
    risk_explanations = relationship("RiskExplanation", back_populates="user")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    order_date = Column(DateTime)
    return_date = Column(DateTime, nullable=True)
    item_value = Column(Float)
    is_returned = Column(Boolean, default=False)
    receipt_reused = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="transactions")

class RiskExplanation(Base):
    __tablename__ = "risk_explanations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    reason = Column(String)
    
    user = relationship("User", back_populates="risk_explanations")
