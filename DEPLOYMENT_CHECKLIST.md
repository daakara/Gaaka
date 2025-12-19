# Search Console ETL Pipeline - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Infrastructure Setup
- [ ] Fabric workspace "DCIS OPS" exists and accessible
- [ ] Lakehouse "DCIS_Staging_Lakehouse" created in workspace
- [ ] Source data available at: `Files/searchconsole/searchdata_url_impression`
- [ ] Source data is in Parquet format
- [ ] Notebook uploaded to Fabric workspace
- [ ] Lakehouse attached to notebook

### ✅ Permissions & Access
- [ ] User has write permissions to lakehouse
- [ ] User can create tables in lakehouse
- [ ] User can execute Spark notebooks
- [ ] Data access permissions validated for source path

### ✅ Configuration Review
- [ ] Schema inspection completed (run inspection cell first)
- [ ] `PARTITION_COLUMN` updated based on actual schema
- [ ] `ZORDER_COLUMNS` configured for query patterns
- [ ] `DUPLICATE_CHECK_COLUMNS` defined based on business logic
- [ ] `CRITICAL_COLUMNS` identified for validation
- [ ] `EXPECTED_COLUMNS` matches source schema
- [ ] Data quality thresholds reviewed and approved

### ✅ Testing
- [ ] Unit tests executed successfully
- [ ] Schema validation tested with sample data
- [ ] Null percentage thresholds validated
- [ ] Duplicate detection logic verified
- [ ] Transformation logic tested

## Deployment Steps

### Step 1: Initial Setup (First-Time Only)
1. [ ] Open Fabric workspace: DCIS OPS
2. [ ] Navigate to Data Engineering section
3. [ ] Upload `SearchConsole_URLImpression_ETL.ipynb`
4. [ ] Attach `DCIS_Staging_Lakehouse` to notebook
5. [ ] Verify source data path is accessible

### Step 2: Schema Discovery
1. [ ] Run only the "Pre-flight Checks" cell
2. [ ] Run only the "Inspect Source Data Schema" cell
3. [ ] Document actual column names
4. [ ] Identify date/timestamp columns for partitioning
5. [ ] Identify frequently queried columns for Z-ordering
6. [ ] Define unique key columns for duplicate detection

### Step 3: Configuration Update
1. [ ] Update `Config` class with actual column names:
   - `PARTITION_COLUMN`
   - `ZORDER_COLUMNS`
   - `DUPLICATE_CHECK_COLUMNS`
   - `CRITICAL_COLUMNS` (in validator calls)
2. [ ] Review and adjust data quality thresholds
3. [ ] Save notebook

### Step 4: Test Execution
1. [ ] Run Section 1: Configuration (verify no errors)
2. [ ] Run Section 2: Data Quality Framework
3. [ ] Run Section 4: Unit Tests (all should pass)
4. [ ] Review test results

### Step 5: Production Execution
1. [ ] Run Section 5: Pre-flight Checks
2. [ ] Review schema inspection output
3. [ ] Execute pipeline (Section 5: "Execute the ETL Pipeline")
4. [ ] Monitor logs for errors or warnings
5. [ ] Review execution report

### Step 6: Validation
1. [ ] Run Section 6: Post-Execution Validation
2. [ ] Verify row counts match expectations
3. [ ] Check data quality metrics
4. [ ] Review partition distribution
5. [ ] Validate table metadata
6. [ ] Run sample queries against new table

## Post-Deployment Checklist

### ✅ Validation
- [ ] Table created successfully: `DCIS_Staging_Lakehouse.searchdata_url_impression`
- [ ] Row count matches source data
- [ ] No critical data quality issues
- [ ] Partitioning strategy working as expected
- [ ] Sample queries return correct results
- [ ] Table accessible to authorized users

### ✅ Documentation
- [ ] README.md reviewed and updated if needed
- [ ] Configuration documented
- [ ] Known issues documented (if any)
- [ ] Deployment notes added to changelog

### ✅ Monitoring Setup
- [ ] Bookmark validation queries for regular monitoring
- [ ] Schedule for weekly OPTIMIZE operations
- [ ] Schedule for weekly VACUUM operations
- [ ] Set up alerts for pipeline failures (if using orchestration)
- [ ] Document monitoring procedures

### ✅ Knowledge Transfer
- [ ] Pipeline documented in team wiki/confluence
- [ ] Runbook shared with operations team
- [ ] Troubleshooting guide accessible
- [ ] Support contacts updated
- [ ] Training completed (if needed)

## Rollback Plan

### In Case of Issues
1. [ ] Document the error/issue encountered
2. [ ] Check logs for specific error messages
3. [ ] If table was created incorrectly:
   ```sql
   DROP TABLE IF EXISTS DCIS_Staging_Lakehouse.searchdata_url_impression;
   ```
4. [ ] Review and fix configuration
5. [ ] Re-execute from Step 3 of deployment

## Production Readiness Criteria

### Must Have ✅
- [x] All unit tests passing
- [x] Data quality validations implemented
- [x] Error handling and logging complete
- [x] Configuration externalized and documented
- [x] Schema validated against source
- [x] Performance optimization enabled (Z-order, partitioning)
- [x] Comprehensive documentation provided

### Should Have 📋
- [ ] Monitoring queries documented
- [ ] Weekly maintenance schedule defined
- [ ] Incident response procedures documented
- [ ] Access control reviewed and approved

### Nice to Have 🎯
- [ ] Automated scheduling (if needed for refreshes)
- [ ] Integration with monitoring tools
- [ ] Automated alerts on failures
- [ ] Performance benchmarking completed

## Schedule & Maintenance

### Initial Deployment
- **Planned Date**: _______________
- **Deployed By**: _______________
- **Validated By**: _______________
- **Approved By**: _______________

### Ongoing Maintenance

#### Daily
- [ ] Monitor latest data load (SQL query)
- [ ] Check for any failed executions

#### Weekly
- [ ] Run OPTIMIZE command
- [ ] Run VACUUM command
- [ ] Review data quality metrics
- [ ] Check partition distribution

#### Monthly
- [ ] Review pipeline performance metrics
- [ ] Analyze query patterns
- [ ] Optimize Z-order columns if needed
- [ ] Review and update documentation

## Support Escalation

### Level 1: Self-Service
- Review troubleshooting guide in README
- Check logs for specific errors
- Validate configuration settings

### Level 2: Data Engineering Team
- Pipeline execution issues
- Data quality validation failures
- Performance optimization

### Level 3: Infrastructure Team
- Fabric workspace issues
- Permission problems
- Resource allocation

## Notes & Comments

**Deployment Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

**Known Issues:**
_____________________________________________
_____________________________________________
_____________________________________________

**Future Enhancements:**
- [ ] Implement incremental loading
- [ ] Add automated scheduling
- [ ] Integrate with monitoring dashboard
- [ ] Implement data lineage tracking
- [ ] Add more granular partitioning if needed

---
**Checklist Version**: 1.0
**Last Updated**: December 15, 2025
**Maintained By**: Data Engineering Team
