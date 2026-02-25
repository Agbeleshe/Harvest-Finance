import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, Length } from 'class-validator';

export class CreateEscrowDto {
    @IsString()
    @IsNotEmpty()
    @Length(56, 56)
    farmerPublicKey: string;

    @IsString()
    @IsNotEmpty()
    @Length(56, 56)
    buyerPublicKey: string;

    @IsString()
    @IsNotEmpty()
    amount: string;

    @IsString()
    @IsOptional()
    assetCode?: string;

    @IsString()
    @IsOptional()
    assetIssuer?: string;

    @IsNumber()
    @Min(0)
    deadlineUnixTimestamp: number;

    @IsString()
    @IsNotEmpty()
    orderId: string;
}

export class ReleasePaymentDto {
    @IsString()
    @IsNotEmpty()
    balanceId: string;

    @IsString()
    @IsNotEmpty()
    @Length(56, 56)
    farmerPublicKey: string;

    @IsString()
    @IsNotEmpty()
    farmerSecretKey: string;
}

export class RefundDto {
    @IsString()
    @IsNotEmpty()
    balanceId: string;

    @IsString()
    @IsNotEmpty()
    @Length(56, 56)
    buyerPublicKey: string;

    @IsString()
    @IsNotEmpty()
    buyerSecretKey: string;
}

export class SetupMultiSigDto {
    @IsString()
    @IsNotEmpty()
    @Length(56, 56)
    primaryPublicKey: string;

    cosignerPublicKeys: string[];

    @IsNumber()
    @Min(1)
    threshold: number;

    @IsString()
    @IsNotEmpty()
    sourceSecretKey: string;
}