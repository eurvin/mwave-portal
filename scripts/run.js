const main = async () => {
  const [owner, ...randomPersons] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  const waveTxn = async () => await waveContract.wave();
  await waveTxn();
  console.log(await waveTxn())
  waveCount = await waveContract.getTotalWaves();
  //
  // waveTxn = await waveContract.connect(randomPersons[1]).wave();
  // await waveTxn.wait();

  // waveCount = await waveContract.getTotalWaves();

  randomPersons.map(async (randomPerson) => {
    const waveTxns = async () => await waveContract.connect(randomPerson).wave();
    console.log(await waveTxns())
    const waveCounts = async () => await waveContract.getTotalWaves();
    console.log(await waveCounts())
  });
  await waveTxn();
  waveCount = await waveContract.getTotalWaves();

  // randomPersons.map(async (randomPerson) => {
  //   waveTxn = await waveContract.connect(randomPerson.address).wave();
  //   console.log(waveTxn)
  //   await waveTxn.wait();
  //   waveCount = await waveContract.getTotalWaves();
  // })

  // let waveCount;
  // waveCount = await waveContract.getTotalWaves();
  //
  // let waveTxn = await waveContract.wave();
  // await waveTxn.wait();
  //
  // waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();