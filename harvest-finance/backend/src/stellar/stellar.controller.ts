import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { StellarService } from './services/stellar.service';
import { CreateEscrowDto, ReleasePaymentDto, RefundDto, SetupMultiSigDto } from './dto/stellar.dto';


@Controller('stellar')
export class StellarController {
    constructor(private readonly stellarService: StellarService) {}

    @Get('health')
    async checkHealth() {
        const connected = await this.stellarService.verifyConnection();
        return { connected, timestamp: new Date().toISOString() };
    }

    @Get('account/:publicKey')
    async getAccount(@Param('publicKey') publicKey: string) {
        return this.stellarService.getAccountInfo(publicKey);
    }

    @Get('fee')
    async estimateFee(@Query('operations') ops?: string) {
        return this.stellarService.estimateFee(ops ? parseInt(ops, 10) : 1);
    }

    @Post('escrow')
    @HttpCode(HttpStatus.CREATED)
    async createEscrow(@Body() dto: CreateEscrowDto) {
        return this.stellarService.createEscrow(dto);
    }

    @Post('escrow/release')
    async releasePayment(@Body() dto: ReleasePaymentDto) {
        return this.stellarService.releasePayment(dto);
    }

    @Post('escrow/refund')
    async refundEscrow(@Body() dto: RefundDto) {
        return this.stellarService.refundEscrow(dto);
    }

    @Get('escrow/:publicKey')
    async getEscrows(@Param('publicKey') publicKey: string) {
        return this.stellarService.getClaimableBalances(publicKey);
    }

    @Get('transaction/:hash')
    async getTransaction(@Param('hash') hash: string) {
        return this.stellarService.getTransactionStatus(hash);
    }

    @Post('multisig')
    async setupMultiSig(@Body() dto: SetupMultiSigDto) {
        return this.stellarService.setupMultiSigAccount(dto);
    }
}